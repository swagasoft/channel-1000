import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-payout',
  templateUrl: './admin-payout.component.html',
  styleUrls: ['./admin-payout.component.scss']
})
export class AdminPayoutComponent implements OnInit {
payouts : any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.readCurrentPayouts();
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

  readCurrentPayouts(){
    this.userService.getPayoutList().subscribe(
      val => {
        console.log(val);
        this.payouts = val['doc'];
      },
      err => {
        console.log(err);

      }
    );
  }
  deleteUser(id){
    console.log(id);
  }
}
