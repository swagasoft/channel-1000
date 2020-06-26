import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
users: any;
transaction: any;
allPayouts: any;
activatedUsers: any;
level_1 : any;
level_2 : any;
level_3 : any;
level_4 : any;
loading = false;

  constructor(private userService: UserService) {
    this.dashboardPropperties();
  }

  ngOnInit() {
 // load script

 this.loadScript('../../../assets/dashboard/vendor/jquery-3.2.1.min.js');
 this.loadScript('../../../assets/dashboard/vendor/bootstrap-4.1/popper.min.js');
 this.loadScript('../../../assets/dashboard/vendor/animsition/animsition.min.js');
 // this.loadScript('../../assets/dashboard/vendor/select2/select2.min.js');
 this.loadScript('../../../assets/dashboard/js/main.js');



    // http service request

  }
  logOut(){
    this.userService.logout();
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

  dashboardPropperties(){
    this.loading = true;
    this.userService.admindashboard().subscribe(
      res => {
        this.users = res['investors'];
        this.allPayouts = res['findAllPayout'];
        this.transaction = res['allTransaction'];
        this.activatedUsers = res['ActivatedUsers'];
        this.level_1 = res['Level1'];
        this.level_2 = res['Level2'];
        this.level_3 = res['Level3'];
        this.level_4 = res['Level4'];
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

}
