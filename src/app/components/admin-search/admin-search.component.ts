import { FlashMessagesService } from 'angular2-flash-messages';
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
transaction: any;
loading: boolean;
userQuery: any;

  constructor(private router: Router, private flashMessage: FlashMessagesService,
     private userService: UserService) { }

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
    console.log(query);
    this.userService.queryUserDetails(query).subscribe(
        response => {
         this.userQuery = query
          this.payout =  response['payout'];
          this.userDetails = response['userDetails'];
          this.transaction = (response['trans']);
          console.log(this.transaction);

          this.userInvestment =  response['queryInvest'];
          console.log(this.userDetails);

          form.value.search = '';
          this.loading = false;
          console.log(response);

        },
        err => {
          this.loading = false;
          this.flashMessage.show(err.error, {cssClass:
            'font-weight-bold text-white bg-danger text-center', timeout: 3000});

          console.log(err);
        }
      );
  }

  modelToNull(){

  }

}
