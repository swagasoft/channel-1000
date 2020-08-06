import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {


  @Input() fullname: string;
  @Input() username: string;
  @Input() email: string;
  @Input() role: string;
  @Input() phone: string;
  @Input() _id: string;
  loading = false;
  constructor(public modalControl : ModalController, private userService: UserService) { }

  userProps = {
    fullname : '',
    username : '',
    email : '',
    role: '',
    phone: '',
    id:''
  }

  ngOnInit() {
    console.log(this.fullname);
    console.log(this.username);
    console.log(this.email);
    console.log(this._id);
    console.log(this.phone);

    this.userProps = {
      fullname : this.fullname,
      username : this.username,
      email : this.email,
      role: this.role,
      phone: this.phone,
      id:this._id
    }

  }


  dismiss(){
    this.modalControl.dismiss();
  }

  confirmEdit(){
    console.log(this.userProps);
    this.loading = true;
    this.userService.updateUserProfile(this.userProps).subscribe(
      res => {
        this.loading = false;
        this.dismiss()
        this.userService.generalToast('error',res['message'], 2000);
        console.log(res);
      },
      err => {
        this.loading = false;
        this.userService.generalToast('error',err.error.message, 3000);
      }
    )


  }

}
