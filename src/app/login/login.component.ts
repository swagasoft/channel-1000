import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private userService : UserService, private router: Router) {

   }

  model = {
    email: '',
    password: ''
  };

  serverErrorMessage: string;
  ngOnInit() {

  }
  onSubmit(form: NgForm){
    this.userService.login(form.value).subscribe(
      response => {
        this.userService.setToken(response['token']);
        setTimeout(()=> {this.router.navigateByUrl('/welcome'); }, 2000);

      },
      err => {
        if(err.status ==401 ||404){
        this.serverErrorMessage = err.error;

      }}
    );
  }

}
