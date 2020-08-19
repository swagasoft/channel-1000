import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-transaction',
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.scss']
})
export class AdminTransactionComponent implements OnInit {
  transactions: any;
  loading: boolean;

  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private router: Router
     ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
   this.readTransactions();
  
  }

  readTransactions() {
    this.loading = true;
    this.userService.getAllTransactions().subscribe( val => {
      console.log(val);
      this.transactions = val['trans'];
      this.loading = false;
    },
    error => {
      console.log(error);
    }
    );
  }
  deleteTranx(id){
    this.loading = true;
    this.userService.deleteTrasaction(id).subscribe(
      response => {
        this.loading = false;
        this.userService.generalToast("success", "transaction deleted!", 2000);
        this.readTransactions();
      }
    );

  }

}
