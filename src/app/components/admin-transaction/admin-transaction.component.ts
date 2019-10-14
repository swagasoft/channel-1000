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
    this.readTransactions();
    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dashboard/js/main.js');

    // this.router.events.subscribe((evt) => {
    //   if(!(evt instanceof NavigationEnd)){
    //     return ;
    //   }

    //   window.scrollTo(0,0);
    // });
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
    this.loading = false;
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
        this.flashMessage.show(`Transaction deleted `,
        {cssClass: ' text-white bg-info text-center font-weight-bold', timeout: 2000});
        this.readTransactions();
      }
    );

  }

}
