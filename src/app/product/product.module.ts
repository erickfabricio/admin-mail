import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ProductRoutingModule } from './product-routing.module';
import { ProductMainComponent } from './components/product-main/product-main.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductSelectComponent } from './components/product-select/product-select.component';

import { ProductCrudComponent } from './components/product-crud/product-crud.component';

import { UtilModule } from '../util/util.module';


@NgModule({
  declarations: [
    ProductMainComponent,
    ProductListComponent,
    
    ProductSelectComponent, ProductCrudComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    UtilModule

  ],
  exports: [
    ProductMainComponent,
    ProductSelectComponent
  ],
  entryComponents: [ProductCrudComponent]
})
export class ProductModule { }
