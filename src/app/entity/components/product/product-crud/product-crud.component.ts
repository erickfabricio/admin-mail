import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { ProductModel } from 'src/app/entity/models/product.model';


@Component({
  selector: 'mail-entity-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  //CRUD
  action: string;
  product: ProductModel;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.title = "CRUD";
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
      date: true
    }
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      service: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      user: new FormControl('', [Validators.required]),
      domain: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      state: new FormControl('', [Validators.required]),
      date: new FormControl({ value: '', disabled: true })
    });
  }

  show() {
    //Action
    switch (this.action) {
      case "CREATE":
        this.create();
        break;
      case "CRUD":
        this.crud();
        break;
    }
  }

  //************ FORM ************//

  create() {
    this.title = "Create product";
    this.visibleControls.id = false;
    this.visibleControls.date = false;
    this.form.reset();
    this.product = null;
  }

  crud() {
    this.title = "CRUD product";
    this.form.get('id').setValue(this.product._id);
    this.form.get('service').setValue(this.product.service);
    this.form.get('name').setValue(this.product.name);
    this.form.get('user').setValue(this.product.user);
    this.form.get('domain').setValue(this.product.domain);
    this.form.get('mail').setValue(this.product.mail);
    this.form.get('password').setValue(this.product.password);
    this.form.get('description').setValue(this.product.description);
    this.form.get('state').setValue(this.product.state);
    this.form.get('date').setValue(this.product.date);
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
      date: true
    }
  }

  //************ ACTIONS OF FORM ************//

  onCreate() {
    if (this.form.valid) {
      //Assignment of values
      this.product = new ProductModel();
      //this.product.id = String(this.form.get('id').value).trim();      
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
      this.entityService.save(ProductModel.entity, this.product)
        .subscribe(product => { console.log("New product"); this.product = <ProductModel>product; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New product: " + this.product.name;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
      this.createForm();
    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
  }

  onUpdate() {
    //Check if there were changes    
    if (this.form.valid) {
      //Assignment of values      
      //this.product.id = String(this.form.get('id').value).trim();      
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
      this.entityService.update(ProductModel.entity, this.product)
        .subscribe(product => { console.log("Update product"); this.product = <ProductModel>product });

      //Succes
      let succesMessage = "Update product: " + this.product.name;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
  }

  onDelete() {
    this.action = "DELETE";
    //Api
    this.entityService.remove(ProductModel.entity, this.product)
      .subscribe(product => { this.product = <ProductModel>product; console.log("Delete product"); console.log(this.product); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete product: " + this.product.name;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {

    if(this.form.get('service').invalid){
      return this.getErrorMessageService();
    }

    if(this.form.get('name').invalid){
      return this.getErrorMessageName();
    }

    if(this.form.get('user').invalid){
      return this.getErrorMessageUser();
    }

    if(this.form.get('domain').invalid){
      return this.getErrorMessageDomain();
    }

    if(this.form.get('mail').invalid){
      return this.getErrorMessageMail();
    }

    if(this.form.get('password').invalid){
      return this.getErrorMessagePassword();
    }

    if(this.form.get('description').invalid){
      return this.getErrorMessageDescription();
    }

    if(this.form.get('state').invalid){
      return this.getErrorMessageState();
    }

  }

  getErrorMessageService() {    
    if (this.form.get('service').hasError('required')) {
      return 'Service is required';
    }    
  }

  getErrorMessageName() {
    if (this.form.get('name').hasError('required')) {
      return 'Name is required';
    }
    if (this.form.get('name').hasError('minlength')) {
      return 'Minimum length is 5 characters';
    }
  }

  getErrorMessageUser() {    
    if (this.form.get('user').hasError('required')) {
      return 'User is required';
    }    
  }

  getErrorMessageDomain() {    
    if (this.form.get('domain').hasError('required')) {
      return 'Domain is required';
    }    
  }

  getErrorMessageMail() {    
    if (this.form.get('mail').hasError('required')) {
      return 'Mail is required';
    }
    if (this.form.get('mail').hasError('email')) {
      return 'Invalid email';
    }
  }

  getErrorMessagePassword() {    
    if (this.form.get('password').hasError('required')) {
      return 'Password is required';
    }    
  }

  getErrorMessageDescription() {    
    if (this.form.get('description').hasError('required')) {
      return 'Description is required';
    }    
  }

  getErrorMessageState() {    
    if (this.form.get('state').hasError('required')) {
      return 'State is required';
    }    
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(
      message,
      action,
      {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: [style]
      }
    );
  }

  //************ EVENTS ************//
  //Process
  @Output() eventUpdateList = new EventEmitter<boolean>();
  eventUpdateListEmitter(isUpdate: boolean) {
    if (isUpdate) {
      this.eventUpdateList.emit(isUpdate);
    }
  }

}
