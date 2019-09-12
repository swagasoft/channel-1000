import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-inactive',
  templateUrl: './admin-inactive.component.html',
  styleUrls: ['./admin-inactive.component.scss']
})
export class AdminInactiveComponent implements OnInit {
inActiveInvestors: any;
  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private userService: UserService) { }

  ngOnInit() {
    this.loadInactive();
    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dashboard/js/main.js');


    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }
      window.scrollTo(0, 0);
    });
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
  logOut(){
    this.userService.logout();
  }

  loadInactive(){
    this.userService.getInActiveUsers().subscribe(
      res => {
        console.log(res);
        this.inActiveInvestors = res['doc'];
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteUser(id, username){
    console.log(id);
    this.userService.deleteUser(id).subscribe(
      response => {
        this.flashMessage.show(`${username} deleted successful...`,
           {cssClass: ' text-success bg-warning text-center font-weight-bold', timeout: 2000});
        this.loadInactive();
      },
      err => {
        this.flashMessage.show(`error deleting ${username}`,
        {cssClass: ' text-danger bg-warning text-center font-weight-bold', timeout: 2000});
        this.loadInactive();
      }
    );
  }

}
