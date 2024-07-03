import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private commonService:CommonService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated() && this.authService.getUserRole() == "user") {
      return true;
    } else {
      this.commonService.showAlerAside("You must login to continue", "warning")
      this.router.navigate(['login']);
      return false;
    }
  }
}
