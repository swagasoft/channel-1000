import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

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
amountInput: any;
newAmount: any;
refInput: any;
emailInput: any;
Username:string;
accountDetails: any;
history: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.loadBalance().subscribe(
      res => {
        this.accountDetails = res['doc'];
      }
    );

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
  paymentDone($event) {
    $event.user = this.Username;
    $event.email = this.emailInput;
    $event.amount = 1000;
    console.log($event);
    this.userService.transasction($event).subscribe(
    err => {
      console.log('err saving data, try again.');
      this.generateRef();
    },
    response => {
      this.generateRef();
      console.log('payment details saved in datbase');

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
}
