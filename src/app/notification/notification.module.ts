import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { MaterialModule } from '../material.module';
import { NotificationRoutingModule } from './notification-routing.module';

import { NotificationMainComponent } from './components/notification-main/notification-main.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationModalNewComponent } from './components/notification-modal-new/notification-modal-new.component';
import { NotificationModalViewComponent } from './components/notification-modal-view/notification-modal-view.component';
//import { ProductSelectComponent } from '../product/components/product-select/product-select.component';


@NgModule({
  declarations: [
    NotificationMainComponent,    
    NotificationListComponent,    
    NotificationModalNewComponent,
    //ProductSelectComponent,
    NotificationModalViewComponent,    
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
  entryComponents: [NotificationModalNewComponent, NotificationModalViewComponent]
})
export class NotificationModule { }