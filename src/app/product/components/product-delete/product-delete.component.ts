import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductModel } from '../../models/product.model'; 
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: ProductModel;  
  process: boolean;

  constructor(private modal: BsModalRef, private productService: ProductService) { }

  public ngOnInit() { 
    this.process = false;
  }

  delete(){

    //Api 
    this.productService.remove(this.product)
    .subscribe(product => {console.log("Delete product:" + product); this.product = product});
    
    //Process
    this.process = true;
    
    //Hide modal      
    this.modal.hide();

  }

}
