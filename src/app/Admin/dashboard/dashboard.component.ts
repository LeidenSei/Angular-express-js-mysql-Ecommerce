import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  admin:any;
  constructor (private commonService:CommonService, private userService:UserService, private router:Router){}

  ngOnInit(): void {
      this.commonService.getUserIdInToken().subscribe((data) => {
        this.admin = data;
      })
  }
  logout(){
    this.userService.logout();
    this.router.navigate(['login'])
  }
}
