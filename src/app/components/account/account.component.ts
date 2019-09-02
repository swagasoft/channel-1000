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
username: string;
userRole: string;
custId: number;
ref_link: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.editAccount().subscribe(
      res => {
        this.userAccount = res['user'];
        console.log(this.userAccount);
        this.fullname = this.userAccount.fullname;
        this.email = this.userAccount.email;
        this.username = this.userAccount.username;
        this.ref_link = this.userAccount.ref_link;
        this.userRole = this.userAccount.role;
        this.custId = this.userAccount.cust_id;
      },
      err => {
        console.log(err);
      }
    );

      // load script

      this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
      this.loadScript('../../assets/dashboard/js/main.js');

  }
  loadScript(url: string){
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  submitProfile(form: NgForm){
    console.log(form.value);

  }
  logOut(){
    this.userService.logout();
  }

}
