import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  isPasswordVisible = false;

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    private authService:AuthService
  ) { }

  onSubmit() {
    if (this.formLogin.invalid) {
      this.commonService.showAlert("Please fullfill the form with righ format", "error");
      return;
    }
  
    this.userService.loginUser(this.formLogin.value).subscribe(
      (data) => {
        if (data && data.token) {
          localStorage.setItem('token', data.token); 
          const role = this.authService.getUserRole();
          const userStatus  = this.authService.getUserStatus();
          console.log(userStatus);
          
            if (role === "admin") {
              if (userStatus === "active") {
                this.router.navigate(['/admin']);
                this.commonService.showAlerAside("Welcome back!!", "success");
              } else if(userStatus === "disabled"){
                this.commonService.showAlerAside("Your account was disabled !!", "warning");
              }
             
            } else {
              this.commonService.showAlerAside("Invalid infor!!", "error");
            }
          }
      },
      (err) => {
        this.commonService.showAlerAside("Invalid infor!!", "error");
      }
    );
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
