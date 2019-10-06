import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: ProductModel;  
  form: FormGroup;
  process: boolean;

  constructor(private modal: BsModalRef, private productService: ProductService) { }

  public ngOnInit() {    
    this.form = this.createFormGroup();    
  }

  createFormGroup(){
    return new FormGroup({
      id: new FormControl({value: this.product._id, disabled: true}),      
      service: new FormControl(this.product.service, [Validators.required]),
      name: new FormControl(this.product.name, [Validators.required]),
      user: new FormControl(this.product.user, [Validators.required]),
      domain: new FormControl(this.product.domain, [Validators.required]),
      mail: new FormControl(this.product.mail, [Validators.required]),
      password1: new FormControl(this.product.password, [Validators.required]),
      password2: new FormControl(this.product.password, [Validators.required]),
      description: new FormControl(this.product.description, [Validators.required, Validators.minLength(1)]),
      state: new FormControl(this.product.state, [Validators.required])
    });
  }

  save(){
            
    if(this.form.valid){
            
      //Assignment of values
      //this.product = new ProductModel();
      this.product.service = String(this.form.get('service').value).trim();
      this.product.name = String(this.form.get('name').value).trim();
      this.product.user = String(this.form.get('user').value).trim();
      this.product.domain = String(this.form.get('domain').value).trim();
      this.product.mail = String(this.form.get('mail').value).trim();
      this.product.password = String(this.form.get('password1').value).trim();            
      this.product.description = String(this.form.get('description').value).trim();
      this.product.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.productService.updateProduct(this.product)
      .subscribe(product => {console.log("Update product:" + product); this.product = product});

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
