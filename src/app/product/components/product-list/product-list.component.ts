import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductModel } from 'src/app/product/models/product.model';
import { ProductService } from 'src/app/product/services/product.service';
import { ProductNewComponent } from '../product-new/product-new.component';

import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { ProductViewComponent } from '../product-view/product-view.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: ProductModel[];

  //New
  modalNewProduct: BsModalRef;
  newProducto: ProductModel;
  alertNewProduct: boolean = false;

  //View
  modalViewProduct: BsModalRef;

  //Edit
  modalEditProduct: BsModalRef;

  //Delete
  modalDeleteProduct: BsModalRef;
  deleteProducto: ProductModel;

  constructor(private productService: ProductService, private modalService: BsModalService) { }

  ngOnInit() {
    this.find();
  }

  find() {
    this.productService.find()
      .subscribe(products => { console.log(products); this.products = products });
  }

  /**
   * Muestra el componente modal ProductNewComponent y cuando este se oculta
   * obtiene el valor de su propiedad process la cual represanta un boolean
   * indicativo de creacion de un nuevo registro.
   */
  showModalNewProduct() {

    this.modalNewProduct = this.modalService.show(ProductNewComponent);

    //Evento al ocultar el modal
    this.modalService.onHide
      .pipe().subscribe(rep => {

        //Update list        
        if (this.modalNewProduct.content.process) {
          this.find();
          this.newProducto = this.modalNewProduct.content.product;
          console.log("Nuevo producto: " + this.newProducto);
          this.modalNewProduct.content.process = false;

          //Alert
          this.alertNewProduct = true;
          this.alertNewProduct = false;

        } else {
          //Alert
          this.alertNewProduct = false;
        }

      });
  }

  showModalViewProduct(product: ProductModel) {

    this.modalViewProduct = this.modalService.show(ProductViewComponent, {
      initialState: {
        product: product
      }
    });

  }

  showModalEditProduct(product: ProductModel) {
    this.modalEditProduct = this.modalService.show(ProductEditComponent, {
      initialState: {
        product: product
      }
    });
  }

  showModalDeleteProduct(product: ProductModel) {
    this.modalDeleteProduct = this.modalService.show(ProductDeleteComponent, {
      initialState: {
        product: product
      }
    });

    //Evento al ocultar el modal
    this.modalService.onHide
      .pipe().subscribe(rep => {

        //Delete list        
        if (this.modalDeleteProduct.content.process) {
          this.find();
          this.deleteProducto = this.modalDeleteProduct.content.product;
          console.log("Elimino producto: " + this.deleteProducto);
          this.modalDeleteProduct.content.process = false;
        }

      });

  }

}
