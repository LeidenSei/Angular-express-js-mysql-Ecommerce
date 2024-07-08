import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url = 'http://localhost:3000/api/contacts';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient:HttpClient) { }

  postContact(contact:any):Observable<any>{
    return this.httpClient.post(url, contact);
  }
  getAllContact():Observable<any>{
    return this.httpClient.get(url);
  }
  getMessageById(id:any):Observable<any>{
    return this.httpClient.get(url+'/'+id)
  }
  deleteContacts(ids: number[]): Observable<any> {
    return this.httpClient.post<any>(`${url}/delete`, { ids });
  }
}
