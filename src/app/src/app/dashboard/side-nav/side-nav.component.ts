import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor( private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  openNav() {
    if(document.getElementById('mySidenav').style.width == '250px'){
    document.getElementById('mySidenav').style.width = '0';
    } else {
    document.getElementById('mySidenav').style.width = '250px';
    }

}

 closeNav() {
  document.getElementById('mySidenav').style.width = '0';

}
logout(){
  this.userService.logout();
}

}
