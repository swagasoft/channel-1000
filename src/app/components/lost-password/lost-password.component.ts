import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {
  loading = false;
  serverOtp: any;
  showOtpSection = false;
  showPasswordField = false;
  
  model = {
    userMail :'',
    password : '',
    otp :''
  }

  

  constructor(public userService: UserService, public modalController: ModalController) { }

  ngOnInit() {
  }


  closeModal(){
    this.modalController.dismiss();
  }


  checkMail(){
    console.log(this.model)
    this.loading = true;
    this.userService.checkEmail(this.model).subscribe(
      res => {
      this.loading = false;
      this.showOtpSection = true;
      // console.log(res);
      this.serverOtp = res['otp'];
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToast('NOT FOUND', err.error.msg, 2000);
        
      }
    );

  }


  submitOtp(){
    
    if (this.serverOtp == this.model.otp){
      this.showPasswordField = true;
      this.showOtpSection = false;
    }else{
      this.model.otp = '';
      this.userService.generalToast('error', 'invalid otp', 2000);
    }

    
  }


  submitNewpassword(){
    console.log(this.model);
    this.loading = true;
    this.userService.updatePassword(this.model).subscribe(
      res => {
        this.closeModal();
        this.loading = false;
        this.userService.generalToast('success', res['msg'], 2000);
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToast('error', err.error.msg, 2000);
      }
    );
  }


  



}
