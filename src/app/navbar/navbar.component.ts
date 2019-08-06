import { UserModel } from '../models/user-model.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userDetails: any;

  constructor(
    public userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
this.userDetails = this.userService.isLogedIn();
console.log(this.userDetails);

  }

  onLogout(){
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

}
