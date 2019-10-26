import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-level3',
  templateUrl: './admin-level3.component.html',
  styleUrls: ['./admin-level3.component.scss']
})
export class AdminLevel3Component implements OnInit {
level3Users: any;
loading: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private  flashMessage: FlashMessagesService) { }

  ngOnInit() {
  this.loading = false;
  this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
  this.loadScript('../../assets/dashboard/js/main.js');

  this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
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
  logOut() {
    this.userService.logout();
  }
  activateUser(fileID: { user_id: string; }, username) {
    this.loading = true;
    this.flashMessage.show(`${username} moved to level 3`, {cssClass:
      'bg-success text-white text-center font-weight-bold', timeout: 4000});
    this.userService.postUserTolevel_4(fileID).subscribe(
  res => {
    this.getLevle3Users();
    this.loading = false;
    this.level3Users = res['docs'];

  },
  err => {
    this.loading = false;
    this.getLevle3Users();
    console.log(err);
  }
);
  }

  getLevle3Users(){
    this.userService.getLevel_3().subscribe(
      res => {
        console.log(res);
        this.level3Users = res['docs'];
      },
      err => {
        console.log(err);
      }
    );
  }
}
