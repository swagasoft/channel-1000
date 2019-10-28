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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.loadBalance().subscribe(
      res => {
        this.accountDetails = res['doc'];
        console.log(this.userDetails);
      }
    );

    this.userRole =  this.userService.getUserRole();
    console.log('USER-ROLE',  this.userRole);

    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0,0);
    });
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails);
      localStorage.setItem('userEmail', this.userDetails.email);
      localStorage.setItem('Username',this.userDetails.username);

      },
      err => {
        console.log('error getting values..', err);

      }
    );

    // load script
    this.loadScript('../../assets/dashboard/vendor/jquery-3.2.1.min.js');
    this.loadScript('../../assets/dashboard/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    // this.loadScript('../../assets/dashboard/vendor/select2/select2.min.js');
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
}
