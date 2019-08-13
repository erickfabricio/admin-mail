import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/services/product.service';
import { ProductModel } from 'src/app/product/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: ProductModel[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe(products => {console.log(products); this.products = products});
  }

}
