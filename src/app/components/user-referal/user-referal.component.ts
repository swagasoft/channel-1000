import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model.model';

@Component({
  selector: 'app-user-referal',
  templateUrl: './user-referal.component.html',
  styleUrls: ['./user-referal.component.scss']
})
export class UserReferalComponent implements OnInit {
  referal_username: string;
  public userRole: string = 'INVESTOR';
  hideForm : boolean;
  showSelection: boolean;
  showBtnLoading: boolean;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(   public userService: UserService,
                 private router: Router,
                 private flashMessage: FlashMessagesService,
                 private activateRoute: ActivatedRoute,
                 config: NgbModalConfig, private modalService: NgbModal) {


    }



  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      const  REFERAL = this.activateRoute.snapshot.params['username'];
      let smallLetterRef =  REFERAL.toLowerCase();
      this.referal_username = smallLetterRef;
      console.log(this.referal_username);
   });

    this.hideForm = true;
    this.showBtnLoading = false;
    this.alignWindow();
    this.userRole == "INVESTOR";
  }

  alignWindow(){
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)) {
        return ;
      }
      window.scrollTo(0,0);
    });
  }



  model: UserModel = {
    fullname: '',
    role: '',
    username : '',
    email   : '',
    password: '',
    ref_username: '',
    package:'',
    confirmPassword: ''
  };


  onSubmit(form: NgForm) {
    // over ride form role value...
    form.value.role = this.userRole;
    form.value.ref_username = this.referal_username;
    this.showBtnLoading = true;
    var userDetails = new FormData();
    userDetails = form.value;

    console.log(userDetails);

    this.userService.postUser(userDetails).subscribe(
      res => {
        this.hideForm = false;
        this.showBtnLoading = false;
        this.resetForm(form);
        this.hideForm = false;
        this.showSelection = true;
      },
      err => {
        if(err.status == 442) {
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
  resetForm(form: NgForm) {
    this.model = {
      fullname: '',
      email: '',
      username: '',
      role: this.userRole,
      password: '',
      package : '',
      ref_username: '',
      confirmPassword:''
    };

    form.resetForm();
  }
}
