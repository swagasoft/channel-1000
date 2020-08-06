import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-inactive',
  templateUrl: './admin-inactive.component.html',
  styleUrls: ['./admin-inactive.component.scss']
})
export class AdminInactiveComponent implements OnInit {
inActiveInvestors: any = [];
loading = false;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private flashMessage: FlashMessagesService,
    private userService: UserService) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.loadInactive();
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

  loadInactive(){
    this.loading  = true;
    this.userService.getInActiveUsers().subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.inActiveInvestors = res['doc'];
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalAlert('No content', err.error.message);
      }
    );
  }

  async deleteConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong> delete user?</strong>!!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.loading = true;
            this.userService.deleteUser(id).subscribe(
              response => {
                this.loading = false;
               this.userService.generalToast('success', response['message'], 3000);
                this.loadInactive();
              },
              err => {
                this.loading = false;
                this.userService.generalToast('error', err.error.message, 3000);
                this.loadInactive();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  // deleteUser(id, username){
  //   console.log(id);
  //   this.userService.deleteUser(id).subscribe(
  //     response => {
  //      this.userService.generalToast('success', response['message'], 3000);
  //       this.loadInactive();
  //     },
  //     err => {
  //       this.userService.generalToast('error', err.error.message, 3000);
  //       this.loadInactive();
  //     }
  //   );
  // }

}
