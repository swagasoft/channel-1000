import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userDetails: any;
accountDetails: any;
userRole: any;
referal_count: any;
activate: any;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getDashboardInformations();
    this.alignWindow();

    this.userRole =  this.userService.getUserRole();
    console.log('USER-ROLE',  this.userRole);
    // load script
    this.loadScript('../../assets/dashboard/vendor/jquery-3.2.1.min.js');
    this.loadScript('../../assets/dashboard/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dashboard/js/main.js');

}

loadScript(url: string){
  const body = <HTMLDivElement> document.body;
  const script = document.createElement('script');
  script.innerHTML = '';
  script.src = url;
  script.async = false;
  script.defer = true;
  body.appendChild(script);
}
louOut() {
  this.userService.logout();
}
alignWindow(){
  this.router.events.subscribe((evt) => {
    if(!(evt instanceof NavigationEnd)){
      return ;
    }

    window.scrollTo(0,0);
  });
}

getDashboardInformations(){
  this.userService.getUserProfile().subscribe(
    res => {
      this.userDetails = res['user'];
      console.log(this.userDetails);
      this.activate = this.userDetails.activate;
      console.log('ACTIVATE', this.activate);
    localStorage.setItem('userEmail', this.userDetails.email);
    localStorage.setItem('Username',this.userDetails.username);

    },
    err => {
      console.log('error getting values..', err);

    }
  );
}
}
