import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/api/product';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private HttpClient:HttpClient) { }

  getAll(): Observable<any>{
    return this.HttpClient.get(url)
  }

  add(product:any):Observable<any>{
    return this.HttpClient.post(url, product)
  }
  delete(id:any):Observable<any>{
    return this.HttpClient.delete(url + '/' + id)
  }
  edit(id:any, product:any):Observable<any>{
    return this.HttpClient.put(url + '/' + id, product);
  }
  getProductById(id:any):Observable<any>{
    return this.HttpClient.get(url + '/' + id);
  }
  getProductBySlug(slug:any):Observable<any>{
    return this.HttpClient.get(url + '/get_by' + '/' + slug);
  }
  get3RecentProduct():Observable<any>{
    return this.HttpClient.get(url + '/3_recent_product');
  }

}
