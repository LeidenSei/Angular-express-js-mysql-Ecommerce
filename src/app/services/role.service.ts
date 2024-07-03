import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = 'http://localhost:3000/api/roles';
  constructor(private httpClient:HttpClient) { }
  getAllRoles():Observable<Role[]>{
    return this.httpClient.get<Role[]>(this.url);
  }
}
