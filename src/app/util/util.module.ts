import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilRoutingModule } from './util-routing.module';
import { AlertComponent } from './components/alert/alert.component';

import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    UtilRoutingModule,
    AlertModule.forRoot()
  ]
})
export class UtilModule { }
