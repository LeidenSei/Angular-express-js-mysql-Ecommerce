import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const url = 'http://localhost:3000/api/shop';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private HttpClient:HttpClient) { }

  shopGetAllProduct():Observable<any>{
    return this.HttpClient.get(url);
  }
  ShopgetAllCategoryWithProduct(){
    return this.HttpClient.get(url + '/category-count');
  }
  ShoppingProductByName(name:any){
    return this.HttpClient.get(url + '/product-name/' +name);
  }
}
