import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

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

      activateRoute.queryParams.subscribe(params => {
        this.referal_username = activateRoute.snapshot.params['username'];
        console.log(this.referal_username);
     });
    }

    model = {
      confirmPassword: ''
    }

  ngOnInit() {
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


  onSubmit(form: NgForm) {
    // over ride form role value...
    form.value.role = this.userRole;
    form.value.ref_username = this.referal_username;
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
    this.userService.selectedUser = {
      fullname: '',
      email: '',
      username: '',
      role: this.userRole,
      password: '',
      ref_username: ''
    };

    form.resetForm();
  }
}
