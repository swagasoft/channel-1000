import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController,
    private flashMessage: FlashMessagesService) {

   }
   model = {
    cashout:  null,
  };

  ngOnInit() {
    this.userRole = this.userService.getUserRole();
    this.getAccountdetials();
 
  }


  getAccountdetials(){
    this.loading = true;
    this.userService.loadBalance().subscribe(
      res => {
        this.loading = false;
        console.log(res['doc']);
        this.account =  res['doc'];
        this.earnings = res['doc']['earnings'] + res['doc']['bonus']; 
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
        this.userService.generalToast("notice","cash out must be above 1000", 2000 );

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
            this.getAccountdetials();
            
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



  async passwordAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'enter your password',
      inputs:[{name:'password', type:'password', placeholder:'my password'}],
      buttons: [{
        text:'confirm',
        handler: (password)=> {
          console.log(password)
          this.userService.validatepassword(password).subscribe(
            res => {
              this.loading = false;
              this.cashOut();
            },
            
            err => {
              this.loading = false;
              this.userService.generalToast("error", err.error.msg, 2000);
            }
          );
        }
      }],
      
    });
  
    await alert.present();
  }


}
