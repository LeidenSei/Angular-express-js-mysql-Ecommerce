import { CommonService } from '../../services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  listOrders:any;
  activeAlert:boolean = false;
  itemOrder:any;
  activeAlertRemove:boolean = false;
  totalMoney: any;
  constructor(private commonService:CommonService){}

  ngOnInit(): void {
    this.getListOrder();
  }
  
  getListOrder(){
   this.listOrders =  this.commonService.getAllCartItem();
   this.totalMoney = this.commonService.calculateTotalMoney(this.listOrders);
  }
  saveOrdersToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.listOrders));
    this.activeAlert = true;
  }

  updateQuantity(event: any, item: any) {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      item.quantity = 1;  
    }
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }
  clickCoupon(){
    this.commonService.showAlerAside("this coupon does not exist", "warning");
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }
  setStatusActive(){
    this.activeAlert = false;
    this.activeAlertRemove = false;
  }
  removeItemCart(id:any){
    this.itemOrder = this.commonService.getCartItemById(id);
    this.commonService.removeCartItemById(id);
    this.activeAlertRemove = true;
    this.commonService.showAlert("Remove item successfully!","success")
    this.getListOrder();
  
  }
  restoreItemCart(){
    this.listOrders.push(this.itemOrder);
    localStorage.setItem('cartItems', JSON.stringify(this.listOrders));
    this.activeAlertRemove = false;
  }
}
