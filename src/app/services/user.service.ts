import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const url = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  registerUser(item: any): Observable<any> {
    return this.httpClient.post<any>(url + 'user/register', item);
  }

  getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(url + 'users');
  }

  loginUser(item: any): Observable<any> {
    return this.httpClient.post<any>(url + 'user/login', item);
  }

  editUser(id: any, item: any): Observable<User> {
    return this.httpClient.put<User>(url + 'user/edit/' + id, item);
  }

  getUserById(id: any): Observable<User> {
    return this.httpClient.get<User>(url + 'user/' + id);
  }

  deleteUserById(id: any): Observable<void> {
    return this.httpClient.delete<void>(url + 'user/delete/' + id);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
