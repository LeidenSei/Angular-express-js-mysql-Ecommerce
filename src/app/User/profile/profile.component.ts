import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: User = {
    id: undefined,
    fullname: undefined,
    phone_number: undefined,
    email: undefined,
    avatar: undefined,
    address: undefined,
    password: undefined,
    created_at: undefined,
    updated_at: undefined,
    is_active: undefined,
    date_of_birth: undefined,
    role_id: undefined
  };
  fileToUpload: any;
  editPofileForm: FormGroup;
  imageUrl: any =
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
  listOrder: Order[] = [];
  regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private fb: FormBuilder,
    private authService:AuthService,
    private router:Router
  ) {
    this.editPofileForm = this.fb.group({
      id: [''],
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      phone_number: [
        '',
        [Validators.required, Validators.pattern(this.regexPhoneNumber)],
      ],
      address: ['', Validators.required],
      password: ['', Validators.required],
      created_at: [''],
      date_of_birth: ['', [Validators.required, this.ageValidator(14)]],
      email: ['', [Validators.required, Validators.email]],
      is_active: [''],
      role_id: [''],
      updated_at: [''],
      avatar: [''],
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.commonService.getUserIdInToken().subscribe((data) => {
      this.userProfile = data;
  
      if (this.userProfile) {
        if (this.userProfile.date_of_birth) {
          const localDate = new Date(this.userProfile.date_of_birth);
          localDate.setMinutes(
            localDate.getMinutes() - localDate.getTimezoneOffset()
          );
          this.userProfile.date_of_birth = localDate.toISOString().substring(0, 10);
        }
  
        this.editPofileForm.patchValue(this.userProfile);
        if (this.userProfile.avatar) {
          this.imageUrl = this.userProfile.avatar;
        }
      }
    });
  }
  

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.editPofileForm.controls).forEach((key) => {
      formData.append(key, this.editPofileForm.get(key)?.value || '');
    });

    if (this.fileToUpload) {
      formData.append('avatar', this.fileToUpload, this.fileToUpload.name);
    }
    console.log(formData);
    this.userService.editUser(this.userProfile.id, formData).subscribe(
      (data) => {
        if (data) {
          this.commonService.showAlert('Edit profile successfully', 'success');
          this.commonService.getUserById(this.userProfile.id).subscribe(() => {
            this.getUserData();
          });
        }
      },
      (error) => {
        console.error('Error:', error.message);
      }
    );
  }
  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }
  ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const today = new Date();
      const birthDate = new Date(control.value);
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < minAge) {
        return { invalidAge: { value: control.value } };
      }

      return null;
    };
  }
  
  logOut(){
    this.authService.logout();
    this.router.navigate(['']);
    this.commonService.showAlerAside("Log out successfully!!", "success")
  }
}
