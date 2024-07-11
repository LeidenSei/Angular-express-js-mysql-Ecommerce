import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shopCategory } from '../models/shop-category';


const url = 'http://localhost:3000/api/shop';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient:HttpClient) { }

  shopGetAllProduct():Observable<any>{
    return this.httpClient.get(url);
  }
  ShopgetAllCategoryWithProduct(): Observable<shopCategory[]> {
    return this.httpClient.get<shopCategory[]>(url + '/category-count');
  }
  ShoppingProductByName(name:any){
    return this.httpClient.get(url + '/product-name/' +name);
  }
}
