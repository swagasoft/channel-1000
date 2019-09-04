import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
userRole: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userRole = this.userService.getUserRole();
  }
  logOut(){
    this.userService.logout();
  }

}
