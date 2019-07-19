import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  constructor(config: NgbModalConfig, private modalService: NgbModal, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

   open(content) {
     console.log(content)
    this.modalService.open(content);
  }

  marketerReg(){
    this.router.navigate(['/marketer-reg']);
    this.modalService.dismissAll();


  }


  ngOnInit() {

  }



}
