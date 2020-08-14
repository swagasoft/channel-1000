import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  activeMembers: any = [];
  loading = false;
  
  displayedColumns: string[] = [ 'email','package', 'investment', 'earnings', 'date','downline'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
    dataSource: any;
  
    constructor(
      private router: Router,
      public alertController: AlertController,
      private userService: UserService) { }
  
    ngOnInit() {
  
    }
  
    ionViewWillEnter(){
      this.loadActive();
      this.router.events.subscribe((evt) => {
        if(!(evt instanceof NavigationEnd)){
          return ;
        }
        window.scrollTo(0, 0);
      });
  
    }


    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


  loadActive() {
    // throw new Error("Method not implemented.");
    this.loading = true;
    this.userService.getActiveUser().subscribe(
      res => {
        // this.activeMembers = res['users'];
        this.loading = false;
        this.dataSource = new MatTableDataSource(res['users']);
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
        this.userService.generalAlert("info", err.error.msg);
      }
    )
  }

}
