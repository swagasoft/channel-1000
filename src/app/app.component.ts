import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'channel-client';
  public selectedIndex = 0;
  public appPages = [

     {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'list'
    },

    {
      title: 'Transactions',
      url: '/transactions',
      icon: 'paper-plane'
    },

    {
      title: 'Payment',
      url: '/payment',
      icon: 'archive'
    },
    {
      title: 'Home',
      url: '/',
      icon: 'home'
    },

  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private router: Router,
    public userService: UserService
  ) {
    // this.initializeApp();
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }

  ngOnInit() {
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
  }

  logout(){
    this.userService.logout();
    // this.router.navigateByUrl('/login');
  }
}

