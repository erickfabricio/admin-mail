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
import { ApplicationMainComponent } from './components/application/application-main/application-main.component';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { ApplicationCrudComponent } from './components/application/application-crud/application-crud.component';
import { UserMainComponent } from './components/user/user-main/user-main.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCrudComponent } from './components/user/user-crud/user-crud.component';
import { LogMainComponent } from './components/log/log-main/log-main.component';
import { LogListComponent } from './components/log/log-list/log-list.component';
import { LogCrudComponent } from './components/log/log-crud/log-crud.component';
import { TokenMainComponent } from './components/token/token-main/token-main.component';
import { TokenListComponent } from './components/token/token-list/token-list.component';
import { TokenCrudComponent } from './components/token/token-crud/token-crud.component';

@NgModule({
  declarations: [EntityMainComponent, ProductMainComponent, ProductListComponent, ProductCrudComponent, NotificationMainComponent, NotificationListComponent, NotificationCrudComponent, ApplicationMainComponent, ApplicationListComponent, ApplicationCrudComponent, UserMainComponent, UserListComponent, UserCrudComponent, LogMainComponent, LogListComponent, LogCrudComponent, TokenMainComponent, TokenListComponent, TokenCrudComponent],
  imports: [
    CommonModule,
    EntityRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EntityMainComponent, ProductMainComponent, NotificationMainComponent, ApplicationMainComponent, UserMainComponent, LogMainComponent],
  entryComponents: []
})
export class EntityModule { }
