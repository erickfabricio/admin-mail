import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductCrudComponent } from '../product-crud/product-crud.component';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.css']
})
export class ProductMainComponent implements OnInit {



  constructor(private modalService: BsModalService, private productService: ProductService) { }

  ngOnInit() { }



  modal: BsModalRef;
  product: ProductModel;

  showModalCrud(action: string) {

    this.productService.findById('5d996646a7cd2358d2a653a3')
      .subscribe(product => { console.log(product); this.product = product });
    
    this.modal = this.modalService.show(ProductCrudComponent, {
      initialState: {
        action: action,
        product: this.product
      }
    });

    //Evento al ocultar el modal
    this.modalService.onHide
      .pipe().subscribe(rep => {

        //Obtener propiedades del modal cuando se oculta

        //this.modal.content.process

      });
  }

}
