import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(
    private userService : UserService,
    private router: Router){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let adminRole= 'admin'
    if(String(this.userService.getUserRole()) !== 'admin'){
      this.router.navigateByUrl('/dashboard');
      this.userService.deleteToken();
      return false;
    }
    return true;
  }

}
