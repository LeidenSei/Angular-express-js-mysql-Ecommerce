import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isPasswordVisible = false;
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    accessRight: new FormControl('', Validators.required)
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    private authService:AuthService
  ) { }

 
  onSubmit() {
    if (this.formLogin.invalid) {
      this.commonService.showAlert("Hãy điền đầy đủ và đúng định dạng", "error");
      return;
    }
  
    this.userService.loginUser(this.formLogin.value).subscribe(
      (data) => {
        if (data && data.token) {
          localStorage.setItem('token', data.token); 
          const role = this.authService.getUserRole();
          const userStatus  = this.authService.getUserStatus();
          console.log(userStatus);
          
          if (this.formLogin.value.accessRight === "admin") {
            if (role === "admin") {
              if (userStatus === "active") {
                this.router.navigate(['/admin']);
                this.commonService.showAlerAside("Welcome back!!", "success");
              } else if(userStatus === "disabled"){
                // localStorage.removeItem("token");
                this.commonService.showAlerAside("Your account was disabled !!", "warning");
              }
             
            } else {
              this.commonService.showAlerAside("Invalid infor!!", "error");
            }
          } else if (this.formLogin.value.accessRight === "user") {
            if (role === "user") {
              this.router.navigate(['']);
              this.commonService.showAlerAside("Login successfully!!", "success");
            } else {
              this.commonService.showAlerAside("Invalid infor!!", "error");
            }
          }
        } else {
          this.commonService.showAlerAside("Invalid infor!!", "error");
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
