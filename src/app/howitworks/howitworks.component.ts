import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-howitworks',
  templateUrl: './howitworks.component.html',
  styleUrls: ['./howitworks.component.scss']
})
export class HowitworksComponent implements OnInit {

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
