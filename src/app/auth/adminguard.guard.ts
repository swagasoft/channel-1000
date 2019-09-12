import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  userRole: any;

  constructor(
    private userService : UserService,
    private router: Router){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    this.userRole = this.userService.getUserRole();
    const admin = 'ADMIN';
    console.log(this.userRole);
    if( this.userRole !== admin){
      this.router.navigateByUrl('/dashboard');
      this.userService.deleteToken();
    console.log(' returning false....');
      return false;

    }
    console.log('returning true....');
    return true;
  }

}
