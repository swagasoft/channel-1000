import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
userRole: any;
top_users : any;
  constructor(private userService: UserService, ) {

  }

  ngOnInit() {
    this.userRole = this.userService.getUserRole();
    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dashboard/js/main.js');

    this.getRewarder();
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

  getRewarder(){
    this.userService.getRewardUsers().subscribe(
      res => {
        console.log(res);
        this.top_users = res;
      }
    );
  }
}
