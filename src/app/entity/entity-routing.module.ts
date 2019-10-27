import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntityMainComponent } from './components/main/main.component';
import { ProductMainComponent } from './components/product/product-main/product-main.component';
import { NotificationMainComponent } from './components/notification/notification-main/notification-main.component';


const routes: Routes = [
  { path: '', component: EntityMainComponent },
  { path: 'product', component: ProductMainComponent },
  { path: 'notification', component: NotificationMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
