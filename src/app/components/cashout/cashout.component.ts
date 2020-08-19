import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.scss']
})
export class CashoutComponent implements OnInit {
  account: any;
  earnings: number;
  userRole: any;
loading = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService) {

   }
   model = {
    cashout:  null,
  };

  ngOnInit() {
    this.userRole = this.userService.getUserRole();
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)) {
        return ;
      }
      window.scrollTo(0, 0);
    });

    this.loading = true;
    this.userService.loadBalance().subscribe(
      res => {
        this.loading = false;
        console.log(res['doc']);
        this.account =  res['doc'];
        this.earnings = res['doc']['earnings'];
        console.log(res['doc']['earnings']);
    },
      err => {
        this.loading = false;
        console.log('ERROR', err);
      }
    );


  }
  
  
  cashOut(){

    if(this.model.cashout < 1000){
      console.log('USER BALANCE', this.earnings );
      this.flashMessage.show('cash out must be above 1000', {cssClass:
        ' text-danger text-center font-weight-bold ', timeout: 5000});
        this.userService.generalToast("error", "cash out must be above 1000",2000);

    }else{
      if(this.model.cashout  > this.earnings ){
        console.log('USER BALANCE', this.earnings );
        this.userService.generalToast("error", "You requested more than your balance",4000);
      }else{
       
        
          this.loading = true;
          this.userService.postCashout(this.model.cashout ).subscribe(
          res => {
            this.userService.generalAlert("message", "cashout successful!");
            this.loading = false;
            console.log('response', res);
            this.account = res['doc'];
            this.returnCashoutTozero();
            
          },
          err => {
            this.loading = false;
            console.log(err);
          }
        );
      }
    }

  }
  returnCashoutTozero(){
    this.model.cashout =  0;
  }


}
