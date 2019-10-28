import {  FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../services/user.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public userRole: string = 'INVESTOR';
  hideForm : boolean;
  showSelection: boolean;
  showBtnLoading: boolean;

  showSuccessMessage: boolean;
  serverErrormessages: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    public userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    config: NgbModalConfig, private modalService: NgbModal

     ) {   }

     model = {
       confirmPassword: ''
     }



  ngOnInit() {
    this.hideForm = true;
    this.showBtnLoading = false;

    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)) {
        return ;
      }

      window.scrollTo(0,0);
    });

  }



  onSubmit(form: NgForm) {
    // over ride form role value...
    form.value.role = this.userRole;
    this.showBtnLoading = true;


    this.userService.postUser(form.value).subscribe(
      res => {
        this.hideForm = false;
        this.showBtnLoading = false;
        this.resetForm(form);
        this.hideForm = false;
        this.showSelection = true;
      },
      err => {
        if(err.status == 442) {
          this.serverErrormessages = err.error.join('<br/>');
          this.showBtnLoading = false;
          this.flashMessage.show(err.error,
             {cssClass: 'font-weight-bold bg-danger text-center text-white', timeout: 3000});

        } else if(err.status == 422) {
          this.showBtnLoading = false;
          this.flashMessage.show(err.error,
           {cssClass: 'font-weight-bold bg-danger text-center text-white', timeout: 5000});

        } else {
          this.showBtnLoading = false;
          this.flashMessage.show('something went wrong , please contact the admin',
           {cssClass: 'font-weight-bold bg-danger text-center text-white', timeout: 5000});
        }
      },

    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullname: '',
      email: '',
      username: '',
      role: this.userRole,
      password: '',
      ref_username: ''
    };

    form.resetForm();
    this.serverErrormessages = '';
  }

  selectOption() {
    const result = document.getElementById('select_role') as HTMLInputElement;
    this.userRole = result.value;
    console.log('userrole', this.userRole);
   }

  ngOnDestroy() {

  }

  investSelect(selection) {
    this.userRole =selection;
    this.showSelection = false;
    this.hideForm = true;
  }
  marketerSelect(selection) {
    this.userRole = selection;
    this.showSelection = false;
    this.hideForm = true;
  }



}
