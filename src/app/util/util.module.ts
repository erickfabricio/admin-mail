import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule } from 'ngx-bootstrap/alert';

import { UtilRoutingModule } from './util-routing.module';
import { AlertComponent } from './components/alert/alert.component';
import { Service } from './classes/service';


@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    UtilRoutingModule,
    AlertModule.forRoot()
  ],
  exports: [    
    AlertComponent
  ]
})
export class UtilModule { }
