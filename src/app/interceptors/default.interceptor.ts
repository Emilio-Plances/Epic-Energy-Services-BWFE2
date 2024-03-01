import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { IUserAuth } from '../interfaces/iuser-auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      let userString:string|null=localStorage.getItem('user');
      if (!userString) return next.handle(req);
      let user:IUserAuth= JSON.parse(userString);
      let newReq=req.clone({
        setHeaders: {
          Authorization:user.token
        }
      })
    return next.handle(newReq);
  }
}

