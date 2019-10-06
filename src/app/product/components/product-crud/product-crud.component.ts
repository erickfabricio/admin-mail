import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  action: string; //C-Create, R-Read, U-Update, D-Delete
  title: string;

  product: ProductModel;
  form: FormGroup;

  visibleControls;


  constructor(private modal: BsModalRef, private productService: ProductService) { }

  ngOnInit() {
    console.log("Action:" + this.action);
    console.log("Product:" + this.product);

    //Default
    this.visibleControls = {
      id: true,
      service: true,
      name: true,
      user: true,
      domain: true,
      mail: true,
      password: true,
      description: true,
      state: true,
      date: true,
    };

    //Action
    switch (this.action) {
      case "CREATE":
        this.create();
        break;
      case "READ":
        this.read();
        break;
      case "UPDATE":
        this.update();
        break;
      case "DELETE":
        this.delete();
        break;
    }

  }

  create() {
    this.title = "Create product";

    this.form = new FormGroup({
      id: new FormControl(''),
      service: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      domain: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)]),
      date: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required])
    });

    this.visibleControls.id = false;
    this.visibleControls.date = false;

  }

  read() {
    this.title = "Read product";

    this.form = new FormGroup({
      id: new FormControl({ value: this.product._id, disabled: true }),
      service: new FormControl({ value: this.product.service, disabled: true }),
      name: new FormControl({ value: this.product.name, disabled: true }),
      user: new FormControl({ value: this.product.user, disabled: true }),
      domain: new FormControl({ value: this.product.domain, disabled: true }),
      mail: new FormControl({ value: this.product.mail, disabled: true }),
      password: new FormControl({ value: this.product.password, disabled: true }),
      description: new FormControl({ value: this.product.description, disabled: true }),
      date: new FormControl({ value: this.product.date, disabled: true }),
      state: new FormControl({ value: this.product.state, disabled: true })
    });

  }

  update() {
    this.title = "Update product";

    this.form = new FormGroup({
      id: new FormControl({ value: this.product._id, disabled: true }),
      service: new FormControl(this.product.service, [Validators.required]),
      name: new FormControl(this.product.name, [Validators.required]),
      user: new FormControl(this.product.user, [Validators.required]),
      domain: new FormControl(this.product.domain, [Validators.required]),
      mail: new FormControl(this.product.mail, [Validators.required]),
      password: new FormControl(this.product.password, [Validators.required]),
      description: new FormControl(this.product.description, [Validators.required, Validators.minLength(1)]),
      date: new FormControl({ value: this.product.date, disabled: true }),
      state: new FormControl(this.product.state, [Validators.required])
    });

    this.visibleControls.date = false;

  }

  delete() {
    this.title = "Delete product";

    this.form = new FormGroup({
      id: new FormControl({ value: this.product._id, disabled: true }),
      service: new FormControl({ value: this.product.service, disabled: true }),
      name: new FormControl({ value: this.product.name, disabled: true }),
      user: new FormControl({ value: this.product.user, disabled: true }),
      domain: new FormControl({ value: this.product.domain, disabled: true }),
      mail: new FormControl({ value: this.product.mail, disabled: true }),
      password: new FormControl({ value: this.product.password, disabled: true }),
      description: new FormControl({ value: this.product.description, disabled: true }),
      date: new FormControl({ value: this.product.date, disabled: true }),
      state: new FormControl({ value: this.product.state, disabled: true })
    });

  }



}
