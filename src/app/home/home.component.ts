import { ICustomer } from '../Models/icustomer';
import { CustomerService } from './../services/customer.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private customerService : CustomerService
  ){}

  allCustomers : ICustomer[] = [];

ngOnInit(event : Event) : void{
  this.customerService.getAll().subscribe( customerList => this.allCustomers = customerList);
}

}
