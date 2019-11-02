import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { NotificationModel } from 'src/app/entity/models/notification.model';
import { ProductModel } from 'src/app/entity/models/product.model';

@Component({
  selector: 'mail-entity-notification-crud',
  templateUrl: './notification-crud.component.html',
  styleUrls: ['./notification-crud.component.css']
})
export class NotificationCrudComponent implements OnInit {

  //CRUD
  action: string;
  notification: NotificationModel;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  //Product
  products: ProductModel[];

  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.title = "CRUD";
    this.visibleControls = {
      id: true,
      product: true,
      state: true,
      creationDate: true,
      sentDate: true,
      to: true,
      cc: true,
      cco: true,
      subject: true,
      html: true,
      attachments: true //is a collection
    }
    this.createForm();
    this.findProduct();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      product: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      creationDate: new FormControl({ value: '', disabled: true }),
      sentDate: new FormControl({ value: '', disabled: true }),
      
      to: new FormControl('', [Validators.required]),
      cc: new FormControl(''),
      cco: new FormControl(''),
      subject: new FormControl('', [Validators.required]),
      html: new FormControl('', [Validators.required]),
      attachments: new FormControl('')
    });
  }

  findProduct() {
    this.entityService.find(ProductModel.entity)
      .subscribe(products => {this.products = <ProductModel[]>products});
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
    this.title = "Create notification";
    
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.visibleControls.sentDate = false;
    
    this.form.reset();
    this.notification = null;
  }

  crud() {
    this.title = "CRUD notification";
    this.form.get('id').setValue(this.notification._id);

    this.visibleControls = {
      id: true,
      product: true,
      state: true,
      creationDate: true,
      sentDate: true,
      to: true,
      cc: true,
      cco: true,
      subject: true,
      html: true,
      attachments: true //is a collection
    }
  }

  //************ ACTIONS OF FORM ************//

  onCreate() {
    if (this.form.valid) {
      //Assignment of values
      this.notification = new NotificationModel();
      //this.notification.id = String(this.form.get('id').value).trim();      
      this.notification.product = String(this.form.get('product').value).trim();

      //Api 
      this.entityService.save(NotificationModel.entity, this.notification)
        .subscribe(notification => { console.log("New notification"); this.notification = <NotificationModel>notification; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New notification: " + this.notification.menssage.subject;
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
      //this.notification.id = String(this.form.get('id').value).trim();      
      this.notification.product = String(this.form.get('product').value).trim();

      //Api 
      this.entityService.update(NotificationModel.entity, this.notification)
        .subscribe(notification => { console.log("Update notification"); this.notification = <NotificationModel>notification });

      //Succes
      let succesMessage = "Update notification: " + this.notification.menssage.subject;
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
    this.entityService.remove(NotificationModel.entity, this.notification)
      .subscribe(notification => { this.notification = <NotificationModel>notification; console.log("Delete notification"); console.log(this.notification); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete notification: " + this.notification.menssage.subject;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {

    if(this.form.get('product').invalid){
      return this.getErrorMessageProduct();
    }

    

  }

  getErrorMessageProduct() {    
    if (this.form.get('product').hasError('required')) {
      return 'Product is required';
    }
  }

  getErrorMessageState() {    
    if (this.form.get('state').hasError('required')) {
      return 'State is required';
    }
  }

  getErrorMessageTo() {    
    if (this.form.get('to').hasError('required')) {
      return 'To is required';
    }
  }

  getErrorMessageCc() {    
    
  }

  getErrorMessageCco() {    
    
  }

  getErrorMessageSubject() {    
    
  }

  getErrorMessageHtml() {    
    
  }

  getErrorMessageAttachments() {    
    
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
