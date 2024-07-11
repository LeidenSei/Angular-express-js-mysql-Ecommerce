
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

const url = 'http://localhost:3000/api/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  postContact(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(url, contact);
  }

  getAllContact(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(url);
  }

  getMessageById(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${url}/${id}`);
  }

  deleteContacts(ids: number[]): Observable<any> {
    return this.httpClient.post<any>(`${url}/delete`, { ids });
  }
}
