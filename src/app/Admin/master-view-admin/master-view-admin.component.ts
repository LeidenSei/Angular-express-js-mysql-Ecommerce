import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-master-view-admin',
  templateUrl: './master-view-admin.component.html',
  styleUrls: ['./master-view-admin.component.scss']
})
export class MasterViewAdminComponent implements OnInit{
  listOrder:any;
  listUser:any;
  totalSale:any;
  constructor(private userService:UserService, private orderServce:OrderService){
    
  }
  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    this.userService.getAllUser().subscribe(data => {
      this.listUser = data;
      this.orderServce.getAllOrder().subscribe(orders => {
        this.listOrder = orders;
        const deliveredOrders = this.listOrder.filter((order: { status: string; }) => order.status === 'delivered');

        this.totalSale = deliveredOrders.reduce((sum: any, order: { total_money: any; }) => sum + order.total_money, 0);
        console.log('Total Sale:', this.totalSale);
      });
    });
  }
  
  
}
