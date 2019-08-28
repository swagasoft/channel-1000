import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-marketer-reg',
  templateUrl: './marketer-reg.component.html',
  styleUrls: ['./marketer-reg.component.scss']
})
export class MarketerRegComponent implements OnInit {
  public userRole: string = 'INVESTOR';

  showSuccessMessage: boolean;
  serverErrormessages: string;
  referal_username: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private router: Router,
     public userService: UserService,
     private activateRoute: ActivatedRoute,
     private flashMessage: FlashMessagesService
     ) {
       activateRoute.queryParams.subscribe(params => {
          this.referal_username = activateRoute.snapshot.params['username'];
          console.log(this.referal_username);
       });
      }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0,0);
    });
  }


    onSubmit(form: NgForm){
      // over ride form user-role and referal username
      form.value.role = this.userRole;
      form.value.ref_username = this.referal_username;

      this.userService.postUser(form.value).subscribe(
        res => {
          this.flashMessage.show('Registration Successful..', {cssClass: 'bg-success text-white', timeout: 3000});

          this.resetForm(form);
          setTimeout(()=> {
            this.router.navigate(['/login']);
          }, 5000);
        },
        err => {
          if(err.status == 442){
            this.serverErrormessages = err.error.join('<br/>');
            this.flashMessage.show(err.error, {cssClass: 'bg-danger text-white', timeout: 3000});

          }else if(err.status == 422){
             // this.serverErrormessages = 'something went wrong , please contact the admin';
             this.flashMessage.show(err.error,
             {cssClass: 'bg-danger text-white', timeout: 5000});

          }else{
             // this.serverErrormessages = 'something went wrong , please contact the admin';
             this.flashMessage.show('something went wrong , please contact the admin',
             {cssClass: 'bg-danger text-white', timeout: 5000});
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
      password: '',
      ref_username:''
    };

    form.resetForm();
    this.serverErrormessages = '';
  }
  selectOption() {
    const result = document.getElementById('select_role') as HTMLInputElement;
   this.userRole = result.value;
   console.log('userrole', this.userRole);
   }

}
