import { OrderService } from './../../services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  user: User = {
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
  id: string | null | undefined;
  listorders: any;
  constructor(private route:ActivatedRoute, private userService:UserService, private orderService:OrderService){}
  
  ngOnInit(): void {
    this.getUserById()
  }
  getUserById(){
    this.route.paramMap.subscribe(async params => {
      
      if (params.has('id')) {
        this.id = params.get('id');
        console.log(this.id);
        
        this.userService.getUserById(this.id).subscribe((data) => {
          this.user = data
        })
        this.orderService.getOrderByUserId(this.id).subscribe((data) => {
          this.listorders = data
        })
      }
    })
  }
}
