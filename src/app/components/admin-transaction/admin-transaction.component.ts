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

  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private router: Router
     ) { }

  ngOnInit() {
    this.readTransactions();
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
  readTransactions() {
    this.userService.getAllTransactions().subscribe( val => {
      console.log(val);
      this.transactions = val['trans'];
    },
    error => {
      console.log(error);
    }
    );
  }
  deleteTranx(id){
    this.userService.deleteTrasaction(id).subscribe(
      response => {
        this.flashMessage.show(`Transaction deleted `,
        {cssClass: ' text-white bg-warning text-center font-weight-bold', timeout: 2000});
        this.readTransactions();
      }
    );

  }

}
