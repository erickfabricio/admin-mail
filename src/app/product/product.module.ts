import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ProductRoutingModule } from './product-routing.module';
import { ProductMainComponent } from './components/product-main/product-main.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductNewComponent } from './components/product-new/product-new.component';
import { ProductSelectComponent } from './components/product-select/product-select.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductCrudComponent } from './components/product-crud/product-crud.component';


@NgModule({
  declarations: [
    ProductMainComponent,
    ProductListComponent,
    ProductNewComponent,           
    ProductSelectComponent, ProductViewComponent, ProductDeleteComponent, ProductEditComponent, ProductCrudComponent    
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  entryComponents:[ProductNewComponent, ProductViewComponent, ProductEditComponent, ProductDeleteComponent, ProductCrudComponent]
})
export class ProductModule { }
