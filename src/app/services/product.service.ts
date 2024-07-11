import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

const apiUrl = 'http://localhost:3000/api/product'; // Adjust URL as per your API endpoint

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(apiUrl);
  }

  addProduct(product: any): Observable<Product> {
    return this.httpClient.post<Product>(apiUrl, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete(`${apiUrl}/${id}`);
  }

  editProduct(id: string, formData: any): Observable<Product> {
    return this.httpClient.put<Product>(`${apiUrl}/${id}`, formData);
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${apiUrl}/${id}`);
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.httpClient.get<Product>(`${apiUrl}/get_by/${slug}`);
  }

  getFourNewestProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${apiUrl}/4_recent_product`);
  }
}
