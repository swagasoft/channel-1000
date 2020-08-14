import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-cashout',
  templateUrl: './admin-cashout.component.html',
  styleUrls: ['./admin-cashout.component.scss']
})
export class AdminCashoutComponent implements OnInit {
  users_cashout: any;
  loading = false;


displayedColumns: string[] = [ 'email','package', 'cashout','action'];
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {



  }


  ionViewWillEnter(){
    this.getAllCashout();
  

  }



  getAllCashout(){
    this.loading = true;
    this.userService.usersCashout().subscribe(
      res => {
        this.loading = false;
        console.log(res['result']);
        this.users_cashout = res['result'];
        this.dataSource = new MatTableDataSource(res['result']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
         const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
           return (currentTerm + (data as { [key: string]: any })[key] + '◬');
         }, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
   
         const transformedFilter = filter.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
   
         return dataStr.indexOf(transformedFilter) != -1;
       }
      },
      err => {
        this.loading = false;
        this.userService.generalAlert("Content", err.error.msg);
        console.log(err);
      }
    );
  }



  cashout(amount){
    this.userService.cashout(amount);
  }


  payUser(id, username, amount){
    console.log(id, username, amount);
    this.userService.payOutUser(id, username, amount).subscribe(
      res => {
        console.log(res);
        this.users_cashout = res['result'];
      },
      err => {
        console.log(err);
      }
    )

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
