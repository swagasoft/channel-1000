import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-investors',
  templateUrl: './admin-investors.component.html',
  styleUrls: ['./admin-investors.component.scss']
})
export class AdminInvestorsComponent implements OnInit {
  investors: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getInvestors().subscribe(
      res => {
        console.log(res['doc']);
        this.investors = res['doc'];
      },
      err => {

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
