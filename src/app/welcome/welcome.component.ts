import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userDetails: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        localStorage.setItem('appuser', this.userDetails );
      },
      err => {
        console.log('error getting values..', err);
      }
    );
  }

}
