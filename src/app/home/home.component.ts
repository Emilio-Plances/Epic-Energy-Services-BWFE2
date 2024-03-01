import { ICustomer } from '../Models/icustomer';
import { CustomerService } from './../services/customer.service';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUserAuth } from '../interfaces/iuser-auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user!: IUserAuth|null;
  allCustomers : ICustomer[] = [];
  logged!:boolean;
  constructor(
    private as:AuthService,private customerService : CustomerService
  ){}
  ngOnInit(){
    this.as.user$.subscribe(user =>this.user=user);
    this.as.booleanUser$.subscribe(user=>this.logged=user)
    this.customerService.getAll().subscribe( customerList => this.allCustomers = customerList);
  }
}
