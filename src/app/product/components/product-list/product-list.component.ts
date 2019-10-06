import { Component, OnInit, ViewChild, ElementRef, ViewChildren, AfterViewInit, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductModel } from 'src/app/product/models/product.model';
import { ProductService } from 'src/app/product/services/product.service';
import { ProductCrudComponent } from '../product-crud/product-crud.component';
import { AlertComponent } from 'src/app/util/components/alert/alert.component';
import { ContentObserver } from '@angular/cdk/observers';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //List
  products: ProductModel[];

  //CRUD
  modal: BsModalRef;
  product: ProductModel;

  constructor(private productService: ProductService, private modalService: BsModalService) { }

  ngOnInit() {
    this.find();
  }

  find() {
    this.productService.find()
      .subscribe(products => { console.log(products); this.products = products });
  }

  showModalCrud(action: string, product: ProductModel) {

    this.modal = this.modalService.show(ProductCrudComponent, {
      initialState: {
        action: action,
        product: product
      }
    });

    
    //ERROR corregir
    //Evento al ocultar el modal
    this.modalService.onHide
      .pipe().subscribe(rep => {
                
        console.log("Process:" + this.modal.content.process);
                
        if (this.modal.content.process) {
          this.find(); //Update list          
        }

        //Delete modal 
        this.modal.content.process = false;
        console.log("modals:" + this.modalService.getModalsCount());
        this.modalService.removeBackdrop();

      });
  }

  



}
