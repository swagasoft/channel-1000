import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    public userService : UserService,
    private router: Router,
    private flashMessage: FlashMessagesService,

    ) { }

  model = {
    email: '',
    password: ''
  };

  serverErrorMessage: string;
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0,0);
    });

  }
  onSubmit(form: NgForm){
    this.userService.login(form.value).subscribe(
      response => {
      this.userService.saveUserRole(response);
      this.userService.setToken(response['token']);
      this.flashMessage.show('login successful...', {cssClass:
         ' text-success text-center font-weight-bold', timeout: 2000});
      setTimeout(() => {this.router.navigateByUrl('/dashboard'); }, 2000);

      },
      err => {
        if(err.status === 401 ||404){
        this.flashMessage.show(err.error, {cssClass: ' text-danger text-center', timeout: 3000});

      }else{
        this.flashMessage.show(err , {cssClass: ' text-danger text-center', timeout: 3000});
      }}
    );
  }

}
