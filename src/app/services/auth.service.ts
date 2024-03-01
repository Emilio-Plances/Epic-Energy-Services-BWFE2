import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILogin } from '../interfaces/ilogin';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IUserAuth } from '../interfaces/iuser-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IRegister } from '../interfaces/iregister';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authorized:BehaviorSubject<IUserAuth|null>=new BehaviorSubject<IUserAuth|null>(null);
  user$=this.authorized.asObservable();
  booleanUser$=this.user$.pipe(map(user=>!!user))
  jwt:JwtHelperService=new JwtHelperService();

  APIUser:string=`${environment.URL}/users`
  APIRegister:string=`${environment.URL}/auth/register`;
  APILogin:string=`${environment.URL}/auth/login`;

  constructor(
    private http:HttpClient,
    private router:Router
  ) {
    this.logged();
  }

  login(user:ILogin):Observable<IUserAuth>{
    return this.http.post<IUserAuth>(this.APILogin,user)
    .pipe(tap(data=>{
      this.authorized.next(data);
      this.autoLogOut(data.token)
      localStorage.setItem('user', JSON.stringify(data))
    }))
  }

  register(user:IRegister):Observable<IUserAuth>{
    return this.http.post<IUserAuth>(this.APIRegister,user)
  }

  updateUser(user:IUserAuth):Observable<IUser>{
    this.authorized.next(user);
    return this.http.put<IUser>(`${this.APIUser}/${user.user.id}`, user.user)
  }

  logged(){
    let localLogin:string|null=localStorage.getItem('user');
    if (!localLogin) return;

    let oldAuth:IUserAuth=JSON.parse(localLogin);
    if(this.jwt.isTokenExpired(oldAuth.token)) return

    this.autoLogOut(oldAuth.token);
    this.authorized.next(oldAuth);
  }

  logOut(){
    localStorage.removeItem('user');
    this.authorized.next(null);
    this.router.navigate(['/home']);
  }

  deleteAccount(id:string):Observable<IUser>{
    return this.http.delete<IUser>(`${this.APIUser}/${id}`);
  }

  autoLogOut(token:string){
    let expiringDate=this.jwt.getTokenExpirationDate(token) as Date;
    let remainingTimeMs=expiringDate.getTime() - new Date().getTime();
    setTimeout(() => {
      this.logOut()
    }, remainingTimeMs)
  }
}
