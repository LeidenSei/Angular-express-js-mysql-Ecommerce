import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url = 'http://localhost:3000/api/rating';
@Injectable({
  providedIn: 'root'
})
export class RatingService{

  constructor(private HttpClient:HttpClient) { }
  postRating(item:any):Observable<any>{
    return this.HttpClient.post(url, item)
  }
  getAllRatingProductById(id:any):Observable<any>{
    return this.HttpClient.get(url + '-products/' +id)
  }
  getRatingProduct(id:any):Observable<any>{
    return this.HttpClient.get(url + '/' +id)
  }
}
