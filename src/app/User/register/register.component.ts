import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { validatePassword } from './validatePassword';
import { isNgContent } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  control: any;
  regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  listUser:any;
  isPasswordVisible = false;
  profileUser = new FormGroup({
    fullname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern(this.regexPhoneNumber)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, {
    validators: validatePassword
  });

  constructor(private userService: UserService, private router: Router, private commonService:CommonService) {}
  ngOnInit(): void {
    this.userService.getAllUser().subscribe(data => {
      this.listUser = data;
    })
  }
  

  onSubmit() {
    if (this.checkDuplicate(this.profileUser.value.email, this.profileUser.value.phone_number)) {
      this.commonService.showAlerAside("Duplicate value!!!", "warning");
      return;
    }
    if (this.profileUser.invalid) {
      this.markFormGroupTouched(this.profileUser);
      return;
    }

    this.userService.registerUser(this.profileUser.value).subscribe((data) => {
      if (data) {
        this.router.navigateByUrl('/login');
        this.commonService.showAlert("Register successfully", "success")
      }
    }, err =>{
      this.commonService.showAlert("Register fail", "error")
    });
  }

  checkDuplicate(form_email:any, form_phone:any){
    return this.listUser.some((item: { email: any; phone_number: any; }) => item.email == form_email || item.phone_number == form_phone);
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      this.control = formGroup.get(key);
      this.control.markAsTouched();
      this.control.markAsDirty();
    });
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
