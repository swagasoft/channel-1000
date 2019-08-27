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
  public userRole: string = 'investor';
 @ViewChild('content', {static: false}) content: any;


  showSuccessMessage: boolean;
  serverErrormessages: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    public userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    config: NgbModalConfig, private modalService: NgbModal

     ) {
        // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

    setTimeout(()=> {
      this.openModal();
    }, 2000);
      }



  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0,0);
    });

  }


  openModal() {
   this.modalService.open(this.content).result.then((result)=> {
     this.userRole = result;
     console.log(this.userRole);
   });
  }


  onSubmit(form: NgForm){
    // over ride form role value...
    form.value.role = this.userRole;


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

  ngOnDestroy(){

  }



}
