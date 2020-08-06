import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails: any;

  constructor(private userService: UserService, private router: Router,  private modalController: ModalController,) { }

  ngOnInit() {
    this.getProfile();

  }
  onLogout(){
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  getProfile(){
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res)
        this.userDetails = res['user'];
      },
      err => {
        console.log('error getting values..', err);
      }
    )
  }


  async editProfile(){
    const modal = await this.modalController.create({
      component: EditProfileComponent,
      componentProps: {
        'fullname': this.userDetails.fullname,
        'email' : this.userDetails.email,
        'username': this.userDetails.username,
        'phone': this.userDetails.phone,
        'role':this.userDetails.role,
        '_id': this.userDetails._id,
      }
    });
    modal.onDidDismiss().then(()=> {
      console.log('i dismiss this modal');
      this.getProfile();
    });
    return await modal.present();
  }



}
