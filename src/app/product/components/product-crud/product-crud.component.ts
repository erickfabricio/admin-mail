import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  product: ProductModel;
  action: string;
  title: string;
  form: FormGroup;
  visibleControls;
  process: boolean;

  constructor(private modal: BsModalRef, private productService: ProductService) { }


  variable: string;

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

    this.process = false;

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
      service: new FormControl('b', [Validators.required]),
      name: new FormControl('b', [Validators.required]),
      user: new FormControl('b', [Validators.required]),
      domain: new FormControl('b', [Validators.required]),
      mail: new FormControl('b', [Validators.required]),
      password: new FormControl('b', [Validators.required]),
      description: new FormControl('b', [Validators.required, Validators.minLength(1)]),      
      state: new FormControl('b', [Validators.required]),
      date: new FormControl('',)
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
      state: new FormControl({ value: this.product.state, disabled: true }),
      date: new FormControl({ value: this.product.date, disabled: true })
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
      state: new FormControl(this.product.state, [Validators.required]),
      date: new FormControl({ value: this.product.date, disabled: true }),
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
      state: new FormControl({ value: this.product.state, disabled: true }),
      date: new FormControl({ value: this.product.date, disabled: true })
    });

  }

  //************ ACTIONS ************//
  onCreate(){
    
    if(this.form.valid){

      console.log("Valid");

      //Assignment of values
      this.product = new ProductModel();
      //this.product._id = String(this.form.get('id').value).trim();
      this.product.service = String(this.form.get('service').value).trim();
      this.product.name = String(this.form.get('name').value).trim();
      this.product.user = String(this.form.get('user').value).trim();
      this.product.domain = String(this.form.get('domain').value).trim();
      this.product.mail = String(this.form.get('mail').value).trim();
      this.product.password = String(this.form.get('password').value).trim();            
      this.product.description = String(this.form.get('description').value).trim();
      this.product.state = String(this.form.get('state').value).trim();
      //this.product.date = String(this.form.get('date').value).trim();
      
      //Api 
      this.productService.save(this.product)
      .subscribe(product => {
        console.log("New product:" + product); 
        this.product = product
      });

      //Process
      this.process = true;

      //Hide modal      
      this.modal.hide();
      this.form.reset();

    }else{
      console.log("No valid");
    }
  }

  onUpdate(){
    
    if(this.form.valid){

      console.log("Valid");

      //Assignment of values
      //this.product = new ProductModel();
      //this.product._id = String(this.form.get('id').value).trim();
      this.product.service = String(this.form.get('service').value).trim();
      this.product.name = String(this.form.get('name').value).trim();
      this.product.user = String(this.form.get('user').value).trim();
      this.product.domain = String(this.form.get('domain').value).trim();
      this.product.mail = String(this.form.get('mail').value).trim();
      this.product.password = String(this.form.get('password').value).trim();            
      this.product.description = String(this.form.get('description').value).trim();
      this.product.state = String(this.form.get('state').value).trim();
      //this.product.date = String(this.form.get('date').value).trim();
      
      //Api 
      this.productService.update(this.product)
      .subscribe(product => {console.log("Update product:" + product); this.product = product});

      //Process
      this.process = false; //No es necesario actualizar la lista

      //Hide modal      
      this.modal.hide();
      this.form.reset();

    }else{
      console.log("No valid");
    }
  }

  onDelete(){
    
    //Api 
    this.productService.remove(this.product)
    .subscribe(product => {console.log("Delete product:" + product); this.product = product});

    //Process
    this.process = true;

    //Hide modal      
    this.modal.hide();
    this.form.reset();

  }


}
