import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityRoutingModule } from './entity-routing.module';
import { ProductMainComponent } from './components/product/product-main/product-main.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductCrudComponent } from './components/product/product-crud/product-crud.component';
import { NotificationMainComponent } from './components/notification/notification-main/notification-main.component';
import { NotificationListComponent } from './components/notification/notification-list/notification-list.component';
import { NotificationCrudComponent } from './components/notification/notification-crud/notification-crud.component';
import { EntityMainComponent } from './components/main/main.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EntityMainComponent, ProductMainComponent, ProductListComponent, ProductCrudComponent, NotificationMainComponent, NotificationListComponent, NotificationCrudComponent],
  imports: [
    CommonModule,
    EntityRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EntityMainComponent, ProductMainComponent, NotificationMainComponent],
  entryComponents: []
})
export class EntityModule { }
