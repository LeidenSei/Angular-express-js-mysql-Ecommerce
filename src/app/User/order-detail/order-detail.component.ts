import { OrderService } from './../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  listOrderDetail:any;
  orderId:any;
  constructor(private CommonService:CommonService, private route:ActivatedRoute, private orderService:OrderService){}
  ngOnInit(): void {
    this.getOrderDetailById();
  }
  getOrderDetailById(){
    this.route.paramMap.subscribe(async params => {
      
      if (params.has('order-id')) {
        this.orderId = params.get('order-id');
        this.orderService.getOrderDetailByOrderId(this.orderId).subscribe( (data) => {
          this.listOrderDetail = data;
        })
        
      }
    })
  }
}
