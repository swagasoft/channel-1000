import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-completed-users',
  templateUrl: './completed-users.component.html',
  styleUrls: ['./completed-users.component.scss']
})
export class CompletedUsersComponent implements OnInit {
completedUsers = [];
loading = false;

  constructor(private userService: UserService, public alertController: AlertController) { }

  ngOnInit() {
  }



  ionViewWillEnter(){
    this.getUsers();
  }

  getUsers(){
    this.completedUsers = [];
    this.userService.getCompletedUsers().subscribe(
      res => {
        console.log(res);
        this.completedUsers = res['users'];
      },
      err => {
        console.log(err)
        this.userService.generalAlert('no user found!', err.error.msg);
      }
    );
  }



  async confirmDelete(user) {
    const alert = await this.alertController.create({
      header: `payout ₦${user.email}`,
      subHeader: ` ${user.fullname} will be delete from this application`,
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
            this.deleteUser(user);
          }
        }
      ]
    });
  
    await alert.present();
  }


  deleteUser(user){
    console.log(user);
    this.loading = true;
    this.userService.deleteUser(user._id).subscribe(
      res => {
        this.loading = false;
        this.getUsers();
      }
    )
  }


  
  

}
