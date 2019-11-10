import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { TokenModel } from 'src/app/entity/models/token.model';
import { ProductModel } from 'src/app/entity/models/product.model';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MessageModel } from 'src/app/entity/models/message.model';
import { AttachmentModel } from 'src/app/entity/models/attachment.model';
import { ApplicationModel } from 'src/app/entity/models/application.model';

@Component({
  selector: 'mail-entity-token-crud',
  templateUrl: './token-crud.component.html',
  styleUrls: ['./token-crud.component.css']
})
export class TokenCrudComponent implements OnInit {

  //CRUD
  @Input() action: string;
  
  @Input() application: ApplicationModel;
  @Input() token: TokenModel;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.title = "CRUD";
    this.visibleControls = {
      id: true,
      token: true,
      payload: true,
      creationDate: true,
      seconds: true,      
      key: true,
      state: true
    };
    this.createForm();    
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      token: new FormControl({ value: '', disabled: true }),
      payload: new FormControl({ value: '', disabled: true }),
      creationDate: new FormControl({ value: '', disabled: true }),
      seconds: new FormControl('', [Validators.required]),
      key: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required])
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
    this.title = "Create token";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.token = null;
  }

  crud() {
    this.form.reset();
    this.title = "CRUD token";

    this.form.get('id').setValue(this.token._id);
    this.form.get('token').setValue(this.token.token);
    this.form.get('payload').setValue(this.token.payload);
    this.form.get('creationDate').setValue(this.token.creationDate);
    this.form.get('seconds').setValue(this.token.seconds);
    this.form.get('key').setValue(this.token.key);
    this.form.get('state').setValue(this.token.state);

    this.visibleControls = {
      id: true,
      token: true,
      payload: true,
      creationDate: true,
      seconds: true,      
      key: true,
      state: true
    }
  }

  //************ ACTIONS OF FORM ************//

  onCreate() {
    if (this.form.valid) {
      //Assignment of values
      this.token = new TokenModel();
            
      this.token.state = String(this.form.get('state').value).trim();

      //Add
      this.application.tokens.push(this.token);
      
      //Succes
      let succesMessage = "New token: " + this.token._id;
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
         
      this.token.state = String(this.form.get('state').value).trim();
            
      //Update 
      
      //Succes
      let succesMessage = "Update token: " + this.token._id;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
  }

  onDelete() {
    this.action = "DELETE";
    //Delete
    
    //Succes
    let succesMessage = "Delete token: " + this.token._id;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {

    if (this.form.get('seconds').invalid) {
      return this.getErrorMessageSeconds();
    }

    if (this.form.get('key').invalid) {
      return this.getErrorMessageKey();
    }

    if (this.form.get('state').invalid) {
      return this.getErrorMessageState();
    }
    
  }

  getErrorMessageSeconds() {
    if (this.form.get('seconds').hasError('required')) {
      return 'Seconds is required';
    }
  }

  getErrorMessageKey() {
    if (this.form.get('key').hasError('required')) {
      return 'Key is required';
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
