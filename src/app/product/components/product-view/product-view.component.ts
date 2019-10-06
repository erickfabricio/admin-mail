import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product: ProductModel;  
  
  constructor(private modal: BsModalRef) { }

  public ngOnInit() { }

}
