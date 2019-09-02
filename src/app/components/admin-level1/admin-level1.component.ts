import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-level1',
  templateUrl: './admin-level1.component.html',
  styleUrls: ['./admin-level1.component.scss']
})
export class AdminLevel1Component implements OnInit {
level1_users: any;
  constructor(private router: Router,
     private userService: UserService,
     private flashMessage: FlashMessagesService, ) { }

  ngOnInit() {this.userService.getLevel_1().subscribe(
    res => {
     this.level1_users = res['docs'];
     console.log(res['docs']);
    },
    err => {
      console.log(err);
    }
  );


              this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
              this.loadScript('../../assets/dashboard/js/main.js');

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)){
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

  activateUser(user_id){
    console.log(user_id);
this.userService.postUserTolevel2('swaga_boy_swag').subscribe(
  res => {
    console.log(res);
    this.flashMessage.show('user moved to level 2 sucessfully', {cssClass:
      'bg-success text-warning text-center font-weight-bold', timeout: 2000});
  },
  err => {
    console.log(err);
  }
)


  }

}
