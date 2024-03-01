import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!:FormGroup;
  regEx: string=`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$`;
  loading!:boolean;
  somethingWrong!:boolean;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ){}

  ngOnInit(){
    this.form=this.fb.group({
      firstName: this.fb.control(null,[Validators.required]),
      lastName: this.fb.control(null,[Validators.required]),
      username: this.fb.control(null,[Validators.required]),
      email: this.fb.control(null,[Validators.required,Validators.email]),
      password: this.fb.control(null,[Validators.required,Validators.pattern(this.regEx)]),
      confirmPassword: this.fb.control(null,[Validators.required,this.passwordMatchValidator])
    })
  }

  passwordMatchValidator=(formC:FormControl):ValidationErrors|null=>{
    if(formC.value!=this.form?.get(`password`)?.value){
      return {
        invalid: true,
        message: "Passwords don't match!"
      }
    }
    return null;
  }

  submit(){
    this.loading=true;
    this.form.value.firstName= this.form.value.firstName.charAt(0).toUpperCase()+this.form.value.firstName.slice(1).toLowerCase();
    this.form.value.lastName= this.form.value.lastName.charAt(0).toUpperCase()+this.form.value.lastName.slice(1).toLowerCase();
    this.form.value.username= this.form.value.username.charAt(0).toUpperCase()+this.form.value.username.slice(1).toLowerCase();
    this.form.value.email=this.form.value.email.toLowerCase();
    delete this.form.value.confirmPassword;
    this.authService.register(this.form.value)
    .pipe(tap(()=>{
      this.loading=false
      this.router.navigate(['auth/login'])
    }),catchError(error=>{
      this.somethingWrong=true;
      console.log(error);

      throw error;
    })).subscribe();
  }
}
