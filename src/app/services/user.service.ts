  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';

  const url = 'http://localhost:3000/api/';

  @Injectable({
    providedIn: 'root'
  })
  export class UserService {

    constructor(private httpClient: HttpClient) { }

    registerUser(item: any): Observable<any> {
      return this.httpClient.post(url + 'user/register', item);
    }

    getAllUser(): Observable<any> {
      return this.httpClient.get(url + 'users');
    }

    loginUser(item: any): Observable<any> {
      return this.httpClient.post(url + 'user/login', item);
    }

    edit(id: any, item: any): Observable<any> {
      return this.httpClient.put(url + 'user/edit/' + id, item);
    }

    getUserById(id: any): Observable<any> {
      return this.httpClient.get(url + 'user/' + id);
    }
    deleteUserById(id: any){
      console.log(id);
      console.log(url + 'user/delete/' + id);
      
      return this.httpClient.delete(url + 'user/' + id);
    }
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

  }
