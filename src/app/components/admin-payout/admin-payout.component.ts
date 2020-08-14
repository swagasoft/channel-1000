import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-payout',
  templateUrl: './admin-payout.component.html',
  styleUrls: ['./admin-payout.component.scss']
})
export class AdminPayoutComponent implements OnInit {
payouts : any;
loading = false;


displayedColumns: string[] = [ 'email','package', 'payout','date'];
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
 
   
  }

 

  readCurrentPayouts(){
    this.userService.getPayoutList().subscribe(
      res => {
        console.log(res);
        this.payouts = res['doc'];
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
        console.log(err);

      }
    );
  }

  
  deleteUser(id){
    console.log(id);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
