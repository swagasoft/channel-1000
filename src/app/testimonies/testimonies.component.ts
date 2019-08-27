import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-testimonies',
  templateUrl: './testimonies.component.html',
  styleUrls: ['./testimonies.component.scss']
})
export class TestimoniesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0,0);
    });

  }

}
