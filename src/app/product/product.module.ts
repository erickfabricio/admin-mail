import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { ProductViewModalComponent } from './components/product-view-modal/product-view-modal.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductViewComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    ProductViewModalComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
