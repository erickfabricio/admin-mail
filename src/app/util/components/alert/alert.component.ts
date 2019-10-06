import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

@Input() typeof : string;

@Input() message : string;

alert = {
 type: this.typeof,
 msg: this.message,
 timeout: 5000 
};

  constructor() {

   }

  ngOnInit() {
  }


}
