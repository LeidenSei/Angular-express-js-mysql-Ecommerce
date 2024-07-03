import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
const url = 'http://localhost:3000/api/category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(url);
  }
  add(category:any):Observable<any>{
    return this.httpClient.post(url, category);
  }
  delete(id:any):Observable<any>{
    return this.httpClient.delete(url + '/' + id)
  }
  update(id:any, item:any):Observable<any>{
    return this.httpClient.put(url + '/' + id, item)
  }
  find(id:any):Observable<any>{
    return this.httpClient.get(url+'/'+id)
  }
}
