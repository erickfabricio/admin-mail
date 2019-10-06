import { Component, OnInit, TemplateRef } from '@angular/core';
import { NotificationModel } from '../../models/notification.model';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { NotificationService } from '../../services/notification.service';
import { ProductService } from 'src/app/product/services/product.service';
import { ProductModel } from 'src/app/product/models/product.model';

@Component({
  selector: 'notification-modal-new',
  templateUrl: './notification-modal-new.component.html',
  styleUrls: ['./notification-modal-new.component.css']
})
export class NotificationModalNewComponent implements OnInit {


  productId(id){
    console.log("padre");
    console.log(id);
  }




  form: FormGroup;
  notification: NotificationModel;

  constructor(private modal: BsModalRef, private notificationService: NotificationService){ }

  ngOnInit(){
    //Create FormGroup
    this.form = new FormGroup({
      product_id: new FormControl('', [Validators.required]),
      state: new FormControl('a', [Validators.required])
    });
  }

  save(){

    if(this.form.valid){

      //Assignment of values
      this.notification = new NotificationModel();
      this.notification.state = String(this.form.get('state').value).trim();
                  
      //Api 
      this.notificationService.createNotification(this.notification)
      .subscribe(notification => {console.log("New notification:" + notification); this.notification = notification});

      //Hide modal      
      //this.modal.hide();
      //this.form.reset();
      
      //Show message
      //this.successfulProcess = true;


      //*********Output*********//
      
    }else{
      console.log("Not Valid");
      
    }
  }


}
