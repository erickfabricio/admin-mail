import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMainComponent } from './components/product-main/product-main.component';

const routes: Routes = [
  { path: '', component : ProductMainComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
