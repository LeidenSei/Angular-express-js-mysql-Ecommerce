import { OrderService } from './../../services/order.service';
import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit{
    listItemOrderDetail:any;
    order:any;
    id:any;
    editOrder:any = {
      shipping_date: '',
      status: ''
    }
  today: string | undefined;
    constructor(private commonService:CommonService, private orderService:OrderService, private route:ActivatedRoute){}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.getToday()
        this.id = params.get('id');
        this.getListItemOrderDetail(this.id);
      });
    }

    getListItemOrderDetail(id:any){
      this.orderService.getOrderDetailByOrderId(id).subscribe((data) => {
        this.listItemOrderDetail = data;
      })
      this.orderService.getOrderById(id).subscribe((data) => {
        this.order = data;
        this.editOrder = {
          shipping_date : this.commonService.formatDate(this.order.shipping_date),
          status: this.order.status
        }
      })
    }

    getToday() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      this.today = yyyy + '-' + mm + '-' + dd;
    }
    onSubmit(){
      this.orderService.editOrderStatus(this.id, this.editOrder).subscribe(response => {
        this.commonService.showAlert("Edit order successfully!!","success")
      }, error => {
        this.commonService.showAlert("Fails","error")
      });
    }
}
