import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationComponent } from './components/notification/notification.component';
import { NotificationViewComponent } from './components/notification-view/notification-view.component';
import { NotificationEditComponent } from './components/notification-edit/notification-edit.component';
import { NotificationDeleteComponent } from './components/notification-delete/notification-delete.component';

const routes: Routes = [
  { path : '', component: NotificationComponent },
  { path: 'view/:id', component : NotificationViewComponent },
  { path: 'edit/:id', component : NotificationEditComponent },
  { path: 'delete/:id', component : NotificationDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }