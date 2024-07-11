import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Order } from '../models/order';
import { OrderDetail } from '../models/order-detail';
import { Checkout } from '../models/checkout';
const url = 'http://localhost:3000/api/checkout-order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }
  postCheckout(order: Order): Observable<Checkout> {
    return this.httpClient.post<Checkout>(url, order);
  }
  getOrderByUserId(id:any):Observable<Order[]>{
    return this.httpClient.get<Order[]>(url + '/userId/' + id)
  }
  getOrderDetailByOrderId(id:any):Observable<OrderDetail[]>{
    return this.httpClient.get<OrderDetail[]>(url + '/order-detail/' + id)
  }
  editOrderStatus(id: any, status: any): Observable<any> {
    return this.httpClient.put(`${url}/set-status-order/${id}`, status);
  }
  deleteOrder(id:any){
    return this.httpClient.delete(url + '/delete-order/' + id)
  }
  getAllOrder():Observable<Order[]>{
    return this.httpClient.get<Order[]>(url + '/orders');
  }
  getOrderById(id:any):Observable<Order>{
    return this.httpClient.get<Order>(url + '/orders/' + id);
  }
}
