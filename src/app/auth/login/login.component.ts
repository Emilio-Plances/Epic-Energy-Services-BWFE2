import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!:FormGroup;
  loading:boolean=false;
  failedLogin:boolean=false;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      username: this.fb.control(null,[Validators.required]),
      password: this.fb.control(null,[Validators.required])
    })
  }

  submit(){
    this.loading=true;
    this.authService.login(this.form.value)
    .pipe(tap(()=>this.loading=false),
    catchError(error=>{
      this.loading=false;
      this.failedLogin=true;
      throw error;
    })
    ).subscribe(()=>this.router.navigate([`/home`]));
  }
}
