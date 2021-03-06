import { ModalController } from '@ionic/angular';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LostPasswordComponent } from '../components/lost-password/lost-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
loading: boolean;

  constructor(
    public userService : UserService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    public modalController:  ModalController

    ) { }

  model = {
    email: '',
    password: ''
  };

  serverErrorMessage: string;
  ngOnInit() {
    this.loading= false;
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0,0);
    });

  }
  onSubmit(form: NgForm){
    this.loading = true;
    this.userService.login(form.value).subscribe(
      response => {
        console.log(response)
        this.userService.saveUserRole(response);
        this.loading = false;
        this.userService.setToken(response['token']);
      localStorage.setItem('username', response['doc']['username']);
      localStorage.setItem('fullname',response['doc']['fullname']);
      localStorage.setItem('package',response['doc']['package']);
      localStorage.setItem('role',response['doc']['role']);

        this.router.navigateByUrl('/dashboard');
      },
      err => {
        console.log(err);

          this.loading = false;
          this.flashMessage.show(err.error.message, {cssClass:
          'font-weight-bold text-white bg-danger text-center', timeout: 3000});
      }
    );
  }

  async lostPssword() {
    const modal = await this.modalController.create({
    component: LostPasswordComponent,
    componentProps: { value: 123 }
    });
  
    await modal.present();
  
  }

  

}
