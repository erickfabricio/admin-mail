import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { ApplicationModel } from 'src/app/entity/models/application.model';
import { ProductModel } from 'src/app/entity/models/product.model';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MessageModel } from 'src/app/entity/models/message.model';
import { AttachmentModel } from 'src/app/entity/models/attachment.model';

@Component({
  selector: 'mail-entity-application-crud',
  templateUrl: './application-crud.component.html',
  styleUrls: ['./application-crud.component.css']
})
export class ApplicationCrudComponent implements OnInit {

  //CRUD
  action: string;
  application: ApplicationModel;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.title = "CRUD";
    this.visibleControls = {
      id: true,
      name: true,
      contact: true,
      description: true,
      creationDate: true,
      state: true,
      tokens: true //is a collection
    }
    this.createForm();    
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      name: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      creationDate: new FormControl({ value: '', disabled: true }),
      state: new FormControl('', [Validators.required]),
      tokens: new FormControl('')
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
    this.title = "Create application";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.application = null;
  }

  crud() {
    this.form.reset();
    this.title = "CRUD application";

    this.form.get('id').setValue(this.application._id);
    this.form.get('name').setValue(this.application.name);
    this.form.get('contact').setValue(this.application.contact);
    this.form.get('description').setValue(this.application.description);
    this.form.get('creationDate').setValue(this.application.creationDate);
    this.form.get('state').setValue(this.application.state);

    this.visibleControls = {
      id: true,
      name: true,
      contact: true,
      description: true,
      creationDate: true,
      state: true,
      tokens: true
    }
  }

  //************ ACTIONS OF FORM ************//

  onCreate() {
    if (this.form.valid) {
      //Assignment of values
      this.application = new ApplicationModel();
      this.application.tokens = [];     
      this.application.name = String(this.form.get('name').value).trim();
      this.application.contact = String(this.form.get('contact').value).trim();
      this.application.description = String(this.form.get('description').value).trim();      
      this.application.state = String(this.form.get('state').value).trim();

      //Api 
      this.entityService.save(ApplicationModel.entity, this.application)
        .subscribe(application => { console.log("New application"); this.application = <ApplicationModel>application; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New application: " + this.application.name;
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
      this.application.name = String(this.form.get('name').value).trim();
      this.application.contact = String(this.form.get('contact').value).trim();
      this.application.description = String(this.form.get('description').value).trim();      
      this.application.state = String(this.form.get('state').value).trim();
            
      //Api 
      this.entityService.update(ApplicationModel.entity, this.application)
        .subscribe(application => { console.log("Update application"); this.application = <ApplicationModel>application });

      //Succes
      let succesMessage = "Update application: " + this.application.name;
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
    this.entityService.remove(ApplicationModel.entity, this.application)
      .subscribe(application => { this.application = <ApplicationModel>application; console.log("Delete application"); console.log(this.application); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete application: " + this.application.name;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {

    if (this.form.get('name').invalid) {
      return this.getErrorMessageName();
    }

    if (this.form.get('contact').invalid) {
      return this.getErrorMessageContact();
    }

    if (this.form.get('description').invalid) {
      return this.getErrorMessageDescription();
    }

    if (this.form.get('state').invalid) {
      return this.getErrorMessageState();
    }
    
  }

  getErrorMessageName() {
    if (this.form.get('name').hasError('required')) {
      return 'Name is required';
    }
  }

  getErrorMessageContact() {
    if (this.form.get('contact').hasError('required')) {
      return 'Contact is required';
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
