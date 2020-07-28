import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Payment {
  amount: number;
  status: string;
  date: number;
}


const PAYMENT: Payment[] = [
  {
    amount: 0,
    date:  null,
    status: 'null'
  }
];

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
exactAmount: any;
userRole: any;
amountInput: any;
newAmount: any;
refInput: any;
emailInput: any;
Username:string;
accountDetails: any;
loading = false;
history: any;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.refreshAccount();
    this.userRole = this.userService.getUserRole();
    this.userService.getTransaction().subscribe(
      res => {
         this.history =  res['result'];
    },
    err => {
      console.log('error',err);

    }
    );

    let userEmail = localStorage.getItem('userEmail');
    this.Username = localStorage.getItem('Username');
    this.emailInput = userEmail;
    this.amountInput= 100000;

    this.generateRef();
    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dashboard/js/main.js');


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

  paynow() {
    // collect exact inputed amount
    this.exactAmount = this.amountInput;
    this.newAmount = (this.amountInput );
    this.amountInput = this.newAmount;


  }
  paymentCancel() {
    console.log('you just cancel a payment!');
    this.generateRef();
  }

  manualPayment(){
    this.loading = true;
    let trans = {
      user : this.Username,
      email : this.emailInput,
      amount : 1000,
      message :'manual',
      status : 'success',
      reference: 1234567890
    }

    this.userService.transasction(trans).subscribe(
      res => {
        this.loading = false;
        this.generateRef();
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.loading = false;
        this.generateRef();
        console.log('payment details saved in datbase',err);

      }
    );
  }

  paymentDone($event) {
    this.loading = true;
    console.info('PAYMENT SUBMIT');
    $event.user = this.Username;
    $event.email = this.emailInput;
    $event.amount = 1000;
    console.log($event);
    this.userService.transasction($event).subscribe(
    response => {
      this.loading = false;
      this.generateRef();
      this.router.navigateByUrl('/dashboard');

    },
    error => {
      this.loading = false;
      this.generateRef();
      console.log('payment details saved in datbase',error);

    }

  );

}
generateRef() {
  const  ref = '' + Math.floor((Math.random() * 1000000000) + 1); // gene
  this.refInput = ref;
}
logOut(){
  this.userService.logout();
}
refreshAccount(){
  this.userService.loadBalance().subscribe(
    res => {
      this.accountDetails = res['doc'];
    }
  );
}
}
