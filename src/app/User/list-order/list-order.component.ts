import { OrderService } from './../../services/order.service';
import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit{
  user:any;
  listOrder:any;
  order:any;
  constructor(private commonService:CommonService, private orderService:OrderService){}
  ngOnInit(): void {
    this.getValueUser();
  }
  getValueUser(){
    this.commonService.getUserIdInToken().subscribe((data) => {
      this.user = data;
      this.orderService.getOrderByUserId(this.user.id).subscribe((data) => {
        this.listOrder = data;
       
      })
    })

  }
  setStatusCancelled(id: any) {
    let status = "cancelled";
    this.orderService.editOrderStatus(id, { status }).subscribe(
      response => {
        console.log('Order updated successfully', response);
        this.getValueUser();
      },
      error => {
        console.error('Error updating order', error);
      }
    );
}
setStatusPending(id: any) {
    let status = "pending";
    this.orderService.editOrderStatus(id, { status }).subscribe(
      response => {
        console.log('Order updated successfully', response);
        this.getValueUser();
      },
      error => {
        console.error('Error updating order', error);
      }
    );
}
filterOrders(listOrder:any) {
  this.listOrder = this.listOrder.filter((order: { status: string; }) => order.status !== 'cancelled');
}
deleteOrder(id: any) {
  this.orderService.deleteOrder(id).subscribe(
      response => {
          this.getValueUser();
          this.commonService.showAlerAside("Delete order successfully", "success")
      },
      error => {
          console.error('Error deleting order:', error);
      }
  );
} 
}
