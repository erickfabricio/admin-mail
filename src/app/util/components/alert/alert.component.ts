import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'util-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() active: boolean;
    
  constructor() {
    
  }

  ngOnInit() {
    this.active = false;
  }
 

}
