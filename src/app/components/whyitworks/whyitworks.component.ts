import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-whyitworks',
  templateUrl: './whyitworks.component.html',
  styleUrls: ['./whyitworks.component.scss']
})
export class WhyitworksComponent implements OnInit {

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
