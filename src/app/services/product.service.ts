import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/api/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private HttpClient:HttpClient) { }

  getAllProduct(): Observable<any>{
    return this.HttpClient.get(url)
  }

  addProduct(product:any):Observable<any>{
    return this.HttpClient.post(url, product)
  }
  deleteProduct(id:any):Observable<any>{
    return this.HttpClient.delete(url + '/' + id)
  }
  editProduct(id:any, product:any):Observable<any>{
    return this.HttpClient.put(url + '/' + id, product);
  }
  getProductById(id:any):Observable<any>{
    return this.HttpClient.get(url + '/' + id);
  }
  getProductBySlug(slug:any):Observable<any>{
    return this.HttpClient.get(url + '/get_by' + '/' + slug);
  }
  getFourNewestProduct():Observable<any>{
    return this.HttpClient.get(url + '/4_recent_product');
  }

}
