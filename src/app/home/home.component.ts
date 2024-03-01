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
  logged!:boolean;
  constructor(
    private as:AuthService
  ){}

  ngOnInit(){
    this.as.user$.subscribe(user =>this.user=user);
    this.as.booleanUser$.subscribe(user=>this.logged=user)
  }
}
