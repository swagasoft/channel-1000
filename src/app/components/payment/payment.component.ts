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
  constructor(private userService: UserService) { }

  ngOnInit() {
    let userEmail = localStorage.getItem('userEmail');
    this.Username = localStorage.getItem('Username');
    console.log(this.Username);
    this.emailInput = userEmail;
    this.amountInput= 100000;

    this.generateRef();

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
    $event.amount = this.amountInput;
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
}
