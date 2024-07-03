import { AuthService } from './../../services/auth.service';
import { CartService } from './../../services/cart.service';
import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  totalCartItems:any;
  user:any;
  constructor(private commonService:CommonService, private cartService:CartService, private authService:AuthService){}
  ngOnInit(): void {
    this.totalCartItems = this.commonService.getAllCartItem();
    this.commonService.getUserIdInToken().subscribe(data => {
      this.user = data;
    });
  }

}
