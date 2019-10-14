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
loading: boolean;

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
      this.flashMessage.show('login successful...', {cssClass:
         ' text-white bg-success text-center font-weight-bold', timeout: 2000});
      setTimeout(() => {this.router.navigateByUrl('/dashboard'); }, 2000);

      },
      err => {
        console.log(err);
        if(err.status === 401 ||404){
          this.loading = false;
        this.flashMessage.show(err.error, {cssClass:
          'font-weight-bold text-white bg-danger text-center', timeout: 3000});

      }else{
        this.loading = false;
        this.flashMessage.show(err , {cssClass:
           'font-weight-bold text-white bg-danger text-center', timeout: 3000});
      }}
    );
  }

}
