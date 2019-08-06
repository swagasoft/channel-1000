import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketer-reg',
  templateUrl: './marketer-reg.component.html',
  styleUrls: ['./marketer-reg.component.scss']
})
export class MarketerRegComponent implements OnInit {
  public userRole: string = 'marketer';

  showSuccessMessage: boolean;
  serverErrormessages: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private router: Router,
     public userService: UserService,
     private flashMessage: FlashMessagesService
     ) { }

  ngOnInit() {
  }

  selectOption() {
    this.router.navigate(['/register']);
    }

    onSubmit(form: NgForm){
      // over ride form role value...
      form.value.role = this.userRole;

      this.userService.postUser(form.value).subscribe(
        res => {


          this.resetForm(form);
        },
        err => {
          if(err.status == 442){
            this.serverErrormessages = err.error.join('<br/>');
          this.flashMessage.show(err.error, {cssClass: 'alert-danger', timeout: 3000});

          }else{

          this.flashMessage.show('something went wrong , please contact the admin', {cssClass: 'alert-danger', timeout: 5000});


          }
        },

      );
    }


  resetForm(form: NgForm){
    this.userService.selectedUser = {
      fullname: '',
      email: '',
      username: '',
      role: this.userRole,
      password: ''
    };

    form.resetForm();
    this.serverErrormessages = '';
  }

}
