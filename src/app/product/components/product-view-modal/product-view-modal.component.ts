import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-view-modal',
  templateUrl: './product-view-modal.component.html',
  styleUrls: ['./product-view-modal.component.css']
})
export class ProductViewModalComponent implements OnInit {

  product : ProductModel;

  constructor() { }

  ngOnInit() {
    console.log(this.product);
  }

}
