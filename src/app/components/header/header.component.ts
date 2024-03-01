import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  logged:boolean=false;
  constructor(
    private as:AuthService
  ){

  }
  ngOnInit():void{
    this.as.booleanUser$.subscribe(booleanUser=>{
      console.log("FANCULO!");
      this.logged = booleanUser
    });
  }
}
