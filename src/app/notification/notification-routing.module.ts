import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationMainComponent } from './components/notification-main/notification-main.component';

const routes: Routes = [
  { path : '', component: NotificationMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }