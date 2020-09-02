import { AlertController } from '@ionic/angular';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-cashout',
  templateUrl: './admin-cashout.component.html',
  styleUrls: ['./admin-cashout.component.scss']
})
export class AdminCashoutComponent implements OnInit {
  users_cashout: any [];
  loading = false;

  constructor(private userService: UserService, private router: Router, public alertController: AlertController) { }

  ngOnInit() {

  }


  ionViewWillEnter(){
    this.getAllCashout();
  }



  getAllCashout(){
    this.loading = true;
    this.userService.usersCashout().subscribe(
      res => {
        this.loading = false;
        console.log(res['result']);
        this.users_cashout = res['result'];
    
      },
      err => {
        console.log('THE ERROR')
        this.loading = false;
        this.users_cashout = [];
        this.userService.generalAlert("Content", err.error.msg);
        console.log(err);
      }
    );
  }



  cashout(amount){
    this.userService.cashout(amount);
  }


  payUser(user){
    this.loading = true;
    let object = {id:user._id, username: user.username, amount: user.cashout, email: user.email, package:user.package};
    this.userService.payOutUser(object).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.userService.generalToast("success", res['message'], 2000);
        this.getAllCashout();
       
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    )

  }

  async confirmPayout(user) {
    const alert = await this.alertController.create({
      header: `payout ₦${user.cashout}`,
      subHeader: ` to ${ user.username}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.payUser(user)
          }
        }
      ]
    });
  
    await alert.present();
  }



}
