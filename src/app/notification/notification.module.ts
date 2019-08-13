import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';

import { NotificationComponent } from './components/notification/notification.component';
import { NotificationViewComponent } from './components/notification-view/notification-view.component';
import { NotificationEditComponent } from './components/notification-edit/notification-edit.component';
import { NotificationDeleteComponent } from './components/notification-delete/notification-delete.component';

@NgModule({
  declarations: [
    NotificationComponent, 
    NotificationViewComponent, 
    NotificationEditComponent, 
    NotificationDeleteComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule { }