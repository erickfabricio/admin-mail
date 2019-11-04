import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { NotificationModel } from 'src/app/entity/models/notification.model';
import { ProductModel } from 'src/app/entity/models/product.model';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MessageModel } from 'src/app/entity/models/message.model';

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

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) {

  }

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
      to: new FormControl('', Validators.compose([Validators.required])),
      //to: new FormControl('', Validators.compose([Validators.required, this.validateEmailsTo])),
      //to: new FormControl('', Validators.compose([Validators.required, this.validateEmails(this.emailsTo)])),
      cc: new FormControl(''),
      cco: new FormControl(''),
      subject: new FormControl('', [Validators.required]),
      html: new FormControl('', [Validators.required]),
      attachments: new FormControl('')
    });
  }

  findProduct() {
    this.entityService.find(ProductModel.entity)
      .subscribe(products => { this.products = <ProductModel[]>products });
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

    //const product = this.products.find(product => product._id == this.notification.product);
    this.form.get('product').setValue(this.notification.product);


    //this.form.get('product').setValue(this.notification.product);
    this.form.get('state').setValue(this.notification.state);
    this.form.get('creationDate').setValue(this.notification.creationDate);
    this.form.get('sentDate').setValue(this.notification.sentDate);
    this.emailsTo = this.notification.message.to.split(',');
    this.emailsCc = this.notification.message.cc.split(',');
    this.emailsCco = this.notification.message.cco.split(',');
    this.form.get('subject').setValue(this.notification.message.subject);
    this.form.get('html').setValue(this.notification.message.html);
    //this.form.get('attachments').setValue(this.notification.message.attachments);    

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
      this.notification.state = String(this.form.get('state').value).trim();
      this.notification.message.to = this.emailsTo.toString();


      //Api 
      this.entityService.save(NotificationModel.entity, this.notification)
        .subscribe(notification => { console.log("New notification"); this.notification = <NotificationModel>notification; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New notification: " + this.notification.message.subject;
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
      let succesMessage = "Update notification: " + this.notification.message.subject;
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
    let succesMessage = "Delete notification: " + this.notification.message.subject;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {

    if (this.form.get('product').invalid) {
      return this.getErrorMessageProduct();
    }

    if (this.form.get('state').invalid) {
      return this.getErrorMessageState();
    }

    console.log("this.form.get('to').invalid:" + this.form.get('to').invalid);
    console.log("this.form.get('to').hasError('invalidEmail'):" + this.form.get('to').hasError('invalidEmail'));
    if (this.form.get('to').invalid || this.form.get('to').hasError('invalidEmail')) {
      return this.getErrorMessageTo();
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
    if (this.form.get('to').hasError('invalidEmail')) {
      for (var email of this.emailsTo) {
        if (!this.regExpEmail.test(email)) {
          return 'Email of To:' + email + ' is invalid';
        }
      }
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

  //************ UTIL ************//

  //PRUEBA
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  regExpEmail: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailsTo: string[] = [];
  emailsCc: string[] = [];
  emailsCco: string[] = [];


  addEmail(event: MatChipInputEvent, emails: string[]): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      emails.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  removeEmail(email: string, emails: string[]): void {
    const index = emails.indexOf(email);
    if (index >= 0) {
      emails.splice(index, 1);
    }
  }

  validateEmails(emails: string[]): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
      for (let email of emails) {
        console.log(email);
        console.log("this.regExpEmail.test(email):" + this.regExpEmail.test(email));
        if (!this.regExpEmail.test(email)) {
          //return { invalidEmail: true };
        }
      }
      //return null;
      return { invalidEmail: true };
    }
  }

  validateEmailsTo(control: FormControl): { [key: string]: boolean } {
    for (var email of this.emailsTo) {
      if (!this.regExpEmail.test(email)) {
        return { invalidEmail: true };
      }
    }
    return null;
  }


}
