import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingProduct } from '../models/rating-product';
const url = 'http://localhost:3000/api/rating';
@Injectable({
  providedIn: 'root'
})
export class RatingService{

  constructor(private HttpClient:HttpClient) { }
  postRating(item:any):Observable<RatingProduct>{
    return this.HttpClient.post<RatingProduct>(url, item)
  }
  getAllRatingProductById(id:any):Observable<RatingProduct[]>{
    return this.HttpClient.get<RatingProduct[]>(url + '-products/' +id)
  }
  getRatingProduct(id:any):Observable<RatingProduct>{
    return this.HttpClient.get<RatingProduct>(url + '/' +id)
  }
}
