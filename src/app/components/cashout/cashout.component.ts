import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.scss']
})
export class CashoutComponent implements OnInit {
  account: number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.loadBalance().subscribe(
      res => {
        console.log(res['doc']);
     this.account =  res['doc']['earnings'];
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
}
