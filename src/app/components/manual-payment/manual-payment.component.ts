import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manual-payment',
  templateUrl: './manual-payment.component.html',
  styleUrls: ['./manual-payment.component.scss']
})
export class ManualPaymentComponent implements OnInit {
ref:number;
loading = false;
formOne = true;
formTwo = false;
userDetails: any;
  constructor(private userService: UserService) { }

  model = {
    investment: null,
    username:'',
    email : '',
    package: '',
    status:"success",
    message:'manually approved',
    reference : this.ref
    
  }
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.generateRef();
    this.formOne = true;
    console.log('fire will enter')
  
  }
  

  generateRef() {
    const  ref =  Math.floor((Math.random() * 1000000000) + 1); // gene
    this.model.reference = ref;
  }

  submit(form : NgForm){
    console.log(this.model);

    if(form.dirty && form.valid){
      this.loading = true;
      this.userService.manualTransaction(this.model).subscribe(
        res => {
          this.userDetails = res['payUser'];
          this.loading = false;
          this.formOne = false;
          this.formTwo = true;
          console.log(res);
        },
        err => {
          this.loading = false;
          console.log(err);
          this.userService.generalToast("error", err.error.message, 3000);
        }
      );

      } else{
        this.userService.generalToast("error","one or more value is required!", 3000);
    }
  }


  confirm(){
    this.loading = true;
    this.userService.confirmManualTrans(this.model).subscribe(
      res=> {
        console.log(res);
        this.loading = false;
        this.close();
        this.resetModel();
        this.userService.generalAlert("success", "manual transaction was successful!");
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }


  close(){
    this.formOne = true;
    this.formTwo = false;
  }




  resetModel(){
    this.generateRef();
    this.model = {
      investment: null,
      username:'',
      email : '',
      package: '',
      status:"success",
      message:'manually approved',
      reference : this.ref
      
    }
  }
}
