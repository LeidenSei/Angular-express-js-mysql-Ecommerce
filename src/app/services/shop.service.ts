import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const url = 'http://localhost:3000/api/shop';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private HttpClient:HttpClient) { }

  getAllProduct():Observable<any>{
    return this.HttpClient.get(url);
  }
  getAllCategoryCount(){
    return this.HttpClient.get(url + '/category-count');
  }
  getProductByName(name:any){
    return this.HttpClient.get(url + '/product-name/' +name);
  }
}
