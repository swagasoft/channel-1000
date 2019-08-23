import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // load script
    this.loadScript('../../assets/dashboard/vendor/jquery-3.2.1.min.js');
    this.loadScript('../../assets/dashboard/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dashboard/vendor/bootstrap-4.1/bootstrap.min.js');
    this.loadScript('../../src/assets/dashboard/vendor/slick/slick.min.js');
    this.loadScript('../../src/assets/dashboard/vendor/wow/wow.min.js');
    this.loadScript('../../assets/dashboard/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dashboard/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js');
    this.loadScript('../../assets/dashboard/vendor/counter-up/jquery.waypoints.min.js');
    this.loadScript('../../assets/dashboard/vendor/counter-up/jquery.counterup.min.js');
    this.loadScript('../../assets/dashboard/vendor/circle-progress/circle-progress.min.js');
    this.loadScript('../../assets/dashboard/vendor/perfect-scrollbar/perfect-scrollbar.js');
    this.loadScript('../../assets/dashboard/vendor/chartjs/Chart.bundle.min.js');
    this.loadScript('../../assets/dashboard/vendor/select2/select2.min.js');
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

}
