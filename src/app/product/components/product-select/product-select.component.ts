import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/product/services/product.service';
import { ProductModel } from 'src/app/product/models/product.model';

@Component({
  selector: 'product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css']
})
export class ProductSelectComponent implements OnInit {

  products: ProductModel[];
  product: ProductModel;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.find()
    .subscribe(products => {console.log(products); this.products = products});
  }

}
