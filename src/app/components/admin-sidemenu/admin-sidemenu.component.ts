import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidemenu',
  templateUrl: './admin-sidemenu.component.html',
  styleUrls: ['./admin-sidemenu.component.scss']
})
export class AdminSidemenuComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

logOut(){
  this.userService.logout();
}

}
