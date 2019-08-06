import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileModel } from 'src/app/models/profileModel';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  profile: ProfileModel;

userAccount: any;
fullname: string;
email: string;
userNumber: number;
userRole: string;
custId: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.editAccount().subscribe(
      res => {
        this.userAccount = res['user'];
        this.fullname = this.userAccount.fullname;
        this.email = this.userAccount.email;
        this.userNumber = this.userAccount.number;
        this.userRole = this.userAccount.role;
        this.custId = this.userAccount.cust_id;
      },
      err => {
        console.log(err);
      }
    )
  }

  submitProfile(form: NgForm){
    console.log(form.value);

  }

}
