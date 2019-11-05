import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { NotificationModel } from 'src/app/entity/models/notification.model';
import { ProductModel } from 'src/app/entity/models/product.model';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MessageModel } from 'src/app/entity/models/message.model';
import { AttachmentModel } from 'src/app/entity/models/attachment.model';

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
    this.emailsTo = [];
    this.emailsCc = [];
    this.emailsCco = [];
    this.attachments = [];
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
    this.emailsTo = [];
    this.emailsCc = [];
    this.emailsCco = [];
    this.attachments = [];
    this.notification = null;
  }

  crud() {
    this.form.reset();
    this.emailsTo = [];
    this.emailsCc = [];
    this.emailsCco = [];
    this.attachments = [];
    this.title = "CRUD notification";

    this.form.get('id').setValue(this.notification._id);
    this.form.get('product').setValue(this.notification.product);
    this.form.get('state').setValue(this.notification.state);
    this.form.get('creationDate').setValue(this.notification.creationDate);
    this.form.get('sentDate').setValue(this.notification.sentDate);
    this.emailsTo = (this.notification.message.to != null) ? this.notification.message.to.split(',') : [];
    console.log();
    this.emailsCc = (this.notification.message.cc != null) ? this.notification.message.cc.split(',') : [];
    this.emailsCco = (this.notification.message.cco != null) ? this.notification.message.cco.split(',') : [];
    this.form.get('subject').setValue(this.notification.message.subject);
    this.form.get('html').setValue(this.notification.message.html);

    if(this.notification.message.attachments != null && this.notification.message.attachments.length > 0) {
      for(let attachment of this.notification.message.attachments){
        this.attachments.push(attachment.path);
      }
    }

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
      this.notification.message = new MessageModel();
      this.notification.message.attachments = [];

      //this.notification.id = String(this.form.get('id').value).trim();
      this.notification.product = String(this.form.get('product').value).trim();
      this.notification.state = String(this.form.get('state').value).trim();
      this.notification.message.to = this.emailsTo.toString();
      this.notification.message.cc = this.emailsCc.toString();
      this.notification.message.cco = this.emailsCco.toString();
      this.notification.message.subject = String(this.form.get('subject').value).trim();
      this.notification.message.html = String(this.form.get('html').value).trim();
      for(let attachmentRef of this.attachments){
        let attachment = new AttachmentModel();
        attachment.path = attachmentRef;
        this.notification.message.attachments.push(attachment);
      }

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
      this.notification.message = new MessageModel();
      this.notification.message.attachments = [];

      this.notification.product = String(this.form.get('product').value).trim();
      this.notification.state = String(this.form.get('state').value).trim();
      this.notification.message.to = this.emailsTo.toString();
      this.notification.message.cc = this.emailsCc.toString();
      this.notification.message.cco = this.emailsCco.toString();
      this.notification.message.subject = String(this.form.get('subject').value).trim();
      this.notification.message.html = String(this.form.get('html').value).trim();

      for(let attachmentRef of this.attachments){
        let attachment = new AttachmentModel();
        attachment.path = attachmentRef;
        this.notification.message.attachments.push(attachment);
      }

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

    if (this.form.get('to').invalid) {
      return this.getErrorMessageTo();
    }

    if (this.form.get('cc').invalid) {
      return this.getErrorMessageCc();
    }

    if (this.form.get('cco').invalid) {
      return this.getErrorMessageCco();
    }

    if (this.form.get('subject').invalid) {
      return this.getErrorMessageSubject();
    }

    if (this.form.get('html').invalid) {
      return this.getErrorMessageHtml();
    }

    if (this.form.get('attachments').invalid) {
      return this.getErrorMessageAttachments();
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
    // if (this.form.get('to').hasError('invalidEmail')) {
    //   for (var email of this.emailsTo) {
    //     if (!this.regExpEmail.test(email)) {
    //       return 'Email of To:' + email + ' is invalid';
    //     }
    //   }
    // }
  }

  getErrorMessageCc() {

  }

  getErrorMessageCco() {

  }

  getErrorMessageSubject() {
    if (this.form.get('subject').hasError('required')) {
      return 'Subject is required';
    }
  }

  getErrorMessageHtml() {
    if (this.form.get('html').hasError('required')) {
      return 'Html is required';
    }
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
  attachments: string[] = [];

  addItem(event: MatChipInputEvent, collection: string[]): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      collection.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  removeItem(item: string, collection: string[]): void {
    const index = collection.indexOf(item);
    if (index >= 0) {
      collection.splice(index, 1);
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
    if (this.emailsTo != null) {
      for (var email of this.emailsTo) {
        if (!this.regExpEmail.test(email)) {
          return { invalidEmailTo: true };
        }
      }
    }
    return null;
  }

  validateEmail(email: string): boolean {
    return this.regExpEmail.test(email);
  }




}
