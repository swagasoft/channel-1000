import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.scss']
})
export class AdminAccountComponent implements OnInit {
userInvestment: any;
userDetails: any;
payout: any;
loading: boolean;

  constructor(private router: Router, private userService: UserService) { }

  model = {
    searchOption: '',
  };

  ngOnInit() {
    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dashboard/js/main.js');
    this.loading = false;

    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0, 0);
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
  searchUser(form: NgForm){
    this.loading = true;
    const query = form.value.search;
    this.userService.queryUserDetails(query).subscribe(
        response => {
          console.log(response['getTest']);
          console.log(response['queryInvest']);
          console.log(response['payout']);
          this.payout =  response['payout'];
          console.log(response['userDetails']);
          this.userService = response['userDetails'];
          console.log(response['trans']);
          this.userInvestment =  response['queryInvest'];
          form.value.search = '';
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
  }

  modelToNull(){

  }

}
