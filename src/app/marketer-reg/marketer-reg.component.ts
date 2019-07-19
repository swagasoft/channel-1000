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


  constructor(private router: Router, public userService: UserService) { }

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
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false
          }, 4000);

          this.resetForm(form);
        },
        err => {
          if(err.status == 442){
            this.serverErrormessages = err.error.join('<br/>');
          }else{
            this.serverErrormessages = 'something went wrong , please contact the admin';

          }
        },

      );
    }


  resetForm(form: NgForm){
    this.userService.selectedUser = {
      firstname: '',
      lastname: '',
      email: '',
      number: null,
      role: this.userRole,
      password: ''
    };

    form.resetForm();
    this.serverErrormessages = '';
  }

}
