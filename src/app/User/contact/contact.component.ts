import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{

  contactForm:any;
  regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  user:any;

  constructor(private fb:FormBuilder, private commonService:CommonService, private contactService:ContactService){}
  ngOnInit(): void {
   this.initializeForm();
   this.getValueWhenLogin();
  }

  initializeForm(){
    this.contactForm = this.fb.group({
      user_id: [''],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(this.regexPhoneNumber)]], 
      message: ['', Validators.required]
    })
  }

  getValueWhenLogin(){
    this.commonService.getUserIdInToken().subscribe(data => {
      this.user = data;
      this.contactForm.patchValue({
        user_id: this.user.id,
        fullname: this.user.fullname,
        email: this.user.email,
        phone_number: this.user.phone_number,
      })
    })
    console.log(this.contactForm);
    
  }
  onSubmit() {
    this.contactService.postContact(this.contactForm.value).subscribe(
      response => {
        this.commonService.showAlert("Your message was sent", "success");
        window.location.reload();
      },
      error => {
        this.commonService.showAlert("Send failed", "error");
      }
    );
  }
  
}
