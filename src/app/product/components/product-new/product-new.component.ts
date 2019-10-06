import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  product: ProductModel;  
  form: FormGroup;  
  process: boolean;
  
  constructor(private modal: BsModalRef, private productService: ProductService) { }

  public ngOnInit() { 
    this.product = null;
    this.process = false;
    this.form = this.createFormGroup();
  }

  createFormGroup(){
    return new FormGroup({
      service: new FormControl('a', [Validators.required]),
      name: new FormControl('a', [Validators.required]),
      user: new FormControl('a', [Validators.required]),
      domain: new FormControl('a', [Validators.required]),
      mail: new FormControl('a', [Validators.required]),
      password1: new FormControl('a', [Validators.required]),
      password2: new FormControl('a', [Validators.required]),
      description: new FormControl('a', [Validators.required, Validators.minLength(1)]),
      state: new FormControl('A', [Validators.required])
    });
  }

  save(){
            
    if(this.form.valid){
            
      //Assignment of values
      this.product = new ProductModel();
      this.product.service = String(this.form.get('service').value).trim();
      this.product.name = String(this.form.get('name').value).trim();
      this.product.user = String(this.form.get('user').value).trim();
      this.product.domain = String(this.form.get('domain').value).trim();
      this.product.mail = String(this.form.get('mail').value).trim();
      this.product.password = String(this.form.get('password1').value).trim();            
      this.product.description = String(this.form.get('description').value).trim();
      this.product.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.productService.saveProduct(this.product)
      .subscribe(product => {console.log("New product:" + product); this.product = product});

      //Process
      this.process = true;

      //Hide modal      
      this.modal.hide();
      this.form.reset();
            
    }else{
      console.log("Not Valid");
      
    }
  }



}
