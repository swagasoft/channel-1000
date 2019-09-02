import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-cashout',
  templateUrl: './admin-cashout.component.html',
  styleUrls: ['./admin-cashout.component.scss']
})
export class AdminCashoutComponent implements OnInit {
  users_cashout: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
this.userService.usersCashout().subscribe(
  res => {
   this.users_cashout = res['result'];
  },
  err => {
    console.log(err);
  }
);

    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dashboard/js/main.js');

    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0,0);
    });
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
  logOut(){
    this.userService.logout();
  }

  cashout(amount){
    this.userService.cashout(amount);
  }

}