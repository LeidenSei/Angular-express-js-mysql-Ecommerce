import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

const url = 'http://localhost:3000/api/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(url);
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(url, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${url}/${id}`);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${url}/${id}`, category);
  }

  findCategory(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${url}/${id}`);
  }
}
