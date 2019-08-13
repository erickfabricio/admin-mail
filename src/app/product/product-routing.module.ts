import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './components/product/product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';

const routes: Routes = [
  { path: '', component : ProductComponent },
  { path: 'view/:id', component : ProductViewComponent },
  { path: 'edit/:id', component : ProductEditComponent },
  { path: 'delete/:id', component : ProductDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
