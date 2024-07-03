import { CommonService } from 'src/app/services/common.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  listOrder: any;
  originalListOrder: any; 
  p: number = 1;
  itemsPerPage: number = 8;
  selectedStatus: string | undefined;

  constructor(private orderService: OrderService, private commonService:CommonService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrder().subscribe((data) => {
      this.listOrder = data;
      this.originalListOrder = data;
    });
  }

  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus = selectElement.value;

    if (this.selectedStatus) {
      this.listOrder = this.originalListOrder.filter((order: { status: string | undefined; }) => order.status === this.selectedStatus);
      if (this.selectedStatus == "status") {
        this.listOrder = this.originalListOrder;
      }
    }
  }
  deleteOrder(id: any) {
    this.orderService.deleteOrder(id).subscribe(
        response => {
            this.getAllOrders();
            this.commonService.showAlerAside("Delete order successfully", "success")
        },
        error => {
            console.error('Error deleting order:', error);
        }
    );
}  
}
