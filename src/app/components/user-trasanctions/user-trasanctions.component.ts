import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-trasanctions',
  templateUrl: './user-trasanctions.component.html',
  styleUrls: ['./user-trasanctions.component.scss']
})
export class UserTrasanctionsComponent implements OnInit {

  payOut = [];
  payIn = []
  segment='payin';

  loading : boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
   this.getTranstion();
  }


  getTranstion(){
    this.loading = true;
    this.userService.getTransaction().subscribe(
      res => {
        this.loading = false;
         this.payIn =  res['result'];
         this.payOut = res['payout']
         console.log(res);
    },
    err => {
      this.loading = false;
      console.log('error',err);

    });
  }


  segmentChanged(event){
    console.log(event)
    this.segment = event.target.value;
  }

}
