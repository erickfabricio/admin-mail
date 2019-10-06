import { Component, OnInit, Input } from '@angular/core';
import { NotificationModel } from '../../models/notification.model';
import { ProductModel } from 'src/app/product/models/product.model';
import { ProductService } from 'src/app/product/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'notification-modal-view',
  templateUrl: './notification-modal-view.component.html',
  styleUrls: ['./notification-modal-view.component.css']
})
export class NotificationModalViewComponent implements OnInit {

  notification: NotificationModel;
  product: ProductModel;
  form: FormGroup;

  constructor(private modal: BsModalRef, private productService: ProductService) {     
  }

  ngOnInit() {
    this.getProduct();
    this.createFormGroup();
    console.log(this.notification);
    console.log(this.product);
  }

  getProduct(){
    //Api
    this.productService.getProductById(this.notification.product)
    .subscribe(product => {console.log(product); this.product = product});
  }

  createFormGroup(){
    this.form = new FormGroup({
      id: new FormControl({value: this.notification._id, disabled: true}),
      product_id: new FormControl({value: "this.product.id", disabled: true})
    });
  }

}
