import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationMainComponent } from './components/notification-main/notification-main.component';
import { NotificationCrudComponent } from './components/notification-crud/notification-crud.component';

const routes: Routes = [
  { path : '', component: NotificationMainComponent },
  { path : ':action/:id', component: NotificationCrudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }