import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor() { }

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

}
