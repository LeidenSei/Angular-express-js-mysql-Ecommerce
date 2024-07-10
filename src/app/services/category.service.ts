import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
const url = 'http://localhost:3000/api/category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategory(): Observable<any> {
    return this.httpClient.get(url);
  }
  addCategory(category:any):Observable<any>{
    return this.httpClient.post(url, category);
  }
  deleteCategory(id:any):Observable<any>{
    return this.httpClient.delete(url + '/' + id)
  }
  updateCategory(id:any, item:any):Observable<any>{
    return this.httpClient.put(url + '/' + id, item)
  }
  findCategory(id:any):Observable<any>{
    return this.httpClient.get(url+'/'+id)
  }
}
