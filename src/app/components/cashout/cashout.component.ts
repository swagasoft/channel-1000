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

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService) {

   }
   model = {
    cashout: '',
  };

  ngOnInit() {
    this.userRole = this.userService.getUserRole();
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)) {
        return ;
      }
      window.scrollTo(0, 0);
    });

    this.userService.loadBalance().subscribe(
      res => {
        console.log(res['doc']);
        this.account =  res['doc'];
       this.earnings = res['doc']['earnings'];
       console.log(res['doc']['earnings']);
    },
      err => {
        console.log('ERROR', err);
      }
    );
    this.loadScript('../../assets/dashboard/vendor/jquery-3.2.1.min.js');
    this.loadScript('../../assets/dashboard/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dashboard/vendor/bootstrap-4.1/bootstrap.min.js');
    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dashboard/js/main.js');


  }
  cashOut(form:NgForm, id){
    form.value.user = id;
    if(form.value.cashout < 1000){
      console.log('USER BALANCE', this.earnings );
      this.flashMessage.show('cash out must be above 1000', {cssClass:
        ' text-danger text-center font-weight-bold ', timeout: 5000});
    }else{
      if(form.value.cashout  > this.earnings ){
        console.log('USER BALANCE', this.earnings );
        this.flashMessage.show('You requested more than your balance', {cssClass:
          ' text-danger text-center font-weight-bold ', timeout: 5000});
      }else{
        this.flashMessage.show(`₦ ${form.value.cashout} cashout successful...`, {cssClass:
          ' text-success text-center font-weight-bold', timeout: 8000});
        this.userService.postCashout(form.value.cashout).subscribe(
          res => {
            console.log('response', res);
            this.account = res['doc'];
            this.returnCashoutTozero();
          },
          err => {
            console.log(err);
          }
        );
      }
    }

  }
  returnCashoutTozero(){
    this.model.cashout = '';
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
