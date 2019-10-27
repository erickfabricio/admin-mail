import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material.module';
import { EntityModule } from '../entity/entity.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    EntityModule
  ]
})
export class MainModule { }
