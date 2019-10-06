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

  constructor() { }

  ngOnInit() { }

}
