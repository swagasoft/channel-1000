import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-level2',
  templateUrl: './admin-level2.component.html',
  styleUrls: ['./admin-level2.component.scss']
})
export class AdminLevel2Component implements OnInit {
leve2users: any;
loading: boolean;

  constructor(
    private router:Router,
    private flashMessage: FlashMessagesService,
     private userService: UserService) { }

  ngOnInit() {
    this.loading = false;
    this.getlevel2Users();
    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dashboard/js/main.js');

    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0,0);
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
  activateUser(fileID: { user_id: string; }, username) {
    this.loading = true;
    console.log(fileID);
    this.flashMessage.show(`${username} moved to level 3`, {cssClass:
      'bg-success text-white text-center font-weight-bold', timeout: 4000});
    this.userService.postUserTolevel_3(fileID).subscribe(
  res => {
    console.log(res);
    this.loading = false;
    this.getlevel2Users();
    this.leve2users = res['docs'];

  },
  err => {
    this.getlevel2Users();
    console.log(err);
  }
);
  }

  getlevel2Users(){
    this.userService.getLevel_2().subscribe(
      res => {
       this.leve2users = res['docs'];
      },
      err => {
        console.log(err);
      }
    );
  }

}
