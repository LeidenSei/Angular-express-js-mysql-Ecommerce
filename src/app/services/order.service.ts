import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
const url = 'http://localhost:3000/api/checkout-order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private HttpClient:HttpClient) { }
  postCheckout(order: any):Observable<any>{
    return this.HttpClient.post(url, order);
  }
  getOrderByUserId(id:any):Observable<any>{
    return this.HttpClient.get(url + '/userId/' + id)
  }
  getOrderDetailByOrderId(id:any):Observable<any>{
    return this.HttpClient.get(url + '/order-detail/' + id)
  }
  editOrderStatus(id: any, status: any): Observable<any> {
    return this.HttpClient.put(`${url}/set-status-order/${id}`, status);
  }
  deleteOrder(id:any){
    return this.HttpClient.delete(url + '/delete-order/' + id)
  }
  getAllOrder():Observable<any>{
    return this.HttpClient.get(url + '/orders');
  }
  getOrderById(id:any):Observable<any>{
    return this.HttpClient.get(url + '/orders/' + id);
  }
}
