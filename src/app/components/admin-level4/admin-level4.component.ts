import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-level4',
  templateUrl: './admin-level4.component.html',
  styleUrls: ['./admin-level4.component.scss']
})
export class AdminLevel4Component implements OnInit {
    level4Users: any;
    loading: boolean;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getLevel4Users();
     this.loading = false;
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
  activateUser(fileID: { user_id: string; }) {
    this.loading = true;
    this.userService.postUserTolevel_4(fileID).subscribe(
  res => {
    this.loading = false;
    this.getLevel4Users();
    console.log(res);
    this.level4Users = res['docs'];

  },
  err => {
    this.loading =false;
    this.getLevel4Users();
    console.log(err);
  }
);
  }
  getLevel4Users(){
    this.userService.getLevel_4().subscribe(
      res => {
        console.log(res);
        this.level4Users = res['doc'];
      },
      err => {
        console.log(err);
      }
    );
  }
}
