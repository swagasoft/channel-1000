import { UserModel } from './../model/user-model.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userDetails: any

  constructor(private userService: UserService) { }

  ngOnInit() {
this.userDetails = this.userService.isLogedIn();
console.log(this.userDetails);

  }

}
