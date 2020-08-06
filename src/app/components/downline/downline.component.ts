import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-downline',
  templateUrl: './downline.component.html',
  styleUrls: ['./downline.component.scss']
})
export class DownlineComponent implements OnInit {
loading : boolean;
downline: any = [];
  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.getDownline();

  }

  getDownline(){
    this.loading = true;
    this.userService.getDownline().subscribe(
      res => {
        this.loading = false;
        console.log(res);
       this.downline = res['my_downline'];
      },
      err => {
        this.loading = false;
        this.userService.generalAlert('message', err.error.message);
        console.log(err)
      }
    )
  }

}
