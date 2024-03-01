import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ICustomer } from '../Models/icustomer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(`${environment.URL}/users`)
  }

  getById(id : number) {
    return this.http.get<ICustomer>(`${environment.URL}/users/${id}`)
  }

  deleteById(id : number) {
    return this.http.delete<ICustomer>(`${environment.URL}/users/${id}`)
  }

  update(customer: ICustomer) : Observable<ICustomer> {
    return this.http.put<ICustomer>(`${environment.URL}/users/${customer.id}`, customer)
  }

  create(customare : Partial<ICustomer>) : Observable<ICustomer> {
    return this.http.post<ICustomer>(`${environment.URL}`, customare)
  }

}
