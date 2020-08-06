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

    this.loading = false;

    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0, 0);
    });
  }


  logOut(){
    this.userService.logout();
  }
  searchUser(){
    this.loading = true;
    console.log(this.model)
    this.userService.searchUserDetails(this.model).subscribe(
        response => {
          console.log(response);
         this.loading = false;
         console.log(response);

        },
        err => {
          this.loading = false;
          this.userService.generalAlert('no content', err.error.message);

          console.log(err);
        }
      );
  }

  modelToNull(){

  }

}
