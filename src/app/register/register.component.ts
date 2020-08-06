import {  FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../services/user.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../models/user-model.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public userRole: string = 'INVESTOR';
  showForm : boolean;
  showSelection: boolean;
  showBtnLoading: boolean;
  selectpackage = true;
  loading = false;

  showSuccessMessage: boolean;
  serverErrormessages: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    public userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute,
    config: NgbModalConfig, private modalService: NgbModal

     ) {   }





  model = {
    fullname: '',
    role: '',
    username : '',
    email   : '',
    password: '',
    ref_username:'',
    package:'',
    confirmPassword: '',
  };



  ngOnInit() {
    this.scrollToTop();
    console.log('referal', this.route.snapshot.queryParams['ref']);
    const Referral =  this.route.snapshot.queryParams['ref'];
    if (Referral){
      console.log('there is referal')
      this.model.ref_username = Referral;
      console.log(this.model.ref_username);
    }


  }

  scrollToTop(){
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)) {
        return ;
      }
      window.scrollTo(0,0);
    });
  }

  ionViewWillEnter(){
    this.selectpackage = true;
    this.showForm = false;
    this.showBtnLoading = false;
   }

  selectPackage(value, role){
    console.log(value, role)
    this.selectpackage = false;
    this.showForm = true;
    this.model.package = value;
    this.model.role = role;
    this.scrollToTop();

  }





  onSubmit(form: NgForm) {
    // over ride form role value...
    form.value.role = this.userRole;
    this.loading = true;
    console.log(this.model);

    this.userService.postUser(this.model).subscribe(
      res => {
        this.loading = false;
        this.resetForm(form);
        this.showSelection = true;
        this.userService.generalAlert('success', res['message']);
        setTimeout(()=> {
          this.goToLogin();
        },3000)
      },
      err => {
          this.loading = false;
          this.userService.generalToast('error', err.error.message, 3000);

      },

    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  resetForm(form: NgForm) {
    this.model = {
      fullname: '',
      email: '',
      username: '',
      role: this.userRole,
      password: '',
      ref_username: null,
      package : '',
      confirmPassword:''
    };

    form.resetForm();
  }

  ngOnDestroy() {

  }

}
