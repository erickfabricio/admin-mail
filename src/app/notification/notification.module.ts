import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { MaterialModule } from '../material.module';
import { NotificationRoutingModule } from './notification-routing.module';

import { NotificationMainComponent } from './components/notification-main/notification-main.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

import { NotificationCrudComponent } from './components/notification-crud/notification-crud.component';



@NgModule({
  declarations: [
    NotificationMainComponent,    
    NotificationListComponent,        
    NotificationCrudComponent,    
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    MaterialModule    
  ],
  exports:[
    NotificationMainComponent
  ],
  entryComponents: []
})
export class NotificationModule { }