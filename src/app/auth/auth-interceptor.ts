import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import {tap} from 'rxjs/operators';





@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(req.headers.get('NoAuth')){
      return next.handle(req.clone());
    }else{
      const clonereq = req.clone({
        headers:req.headers.set("Authorization", "Bearer "+ this.userService.getToken())
      });
      return next.handle(clonereq).pipe(tap(
        event => {

        },
        err => {
          if(err.error.auth == false){
            this.router.navigateByUrl('/login');
          }
        }
      ));
    }
  }
}
