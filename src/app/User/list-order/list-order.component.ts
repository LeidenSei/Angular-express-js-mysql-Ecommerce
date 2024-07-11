import { OrderService } from './../../services/order.service';
import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit{
  user:any;

  listOrder:Order[] = [];

  order:any;

  constructor(private commonService:CommonService, private orderService:OrderService){}

  ngOnInit(): void {
    this.getDataOrdersUser();
  }

  getDataOrdersUser(){
    this.commonService.getUserIdInToken().subscribe((data) => {
      this.user = data;
      this.orderService.getOrderByUserId(this.user.id).subscribe((data) => {
        this.listOrder = data.filter((item: { status: string; }) => item.status != "deleted");
      })
    })
  }

  setStatusOrder(id: any, status: any) {
  const statusChange = status
    this.orderService.editOrderStatus(id, { status }).subscribe(
      response => {
        console.log('Order updated successfully', response);
        this.getDataOrdersUser();
      },
      error => {
        console.error(error);
      }
    );
}

filterOrders(listOrder:any) {
  this.listOrder = this.listOrder.filter((order: { status: string; }) => order.status !== 'cancelled');
}
}
