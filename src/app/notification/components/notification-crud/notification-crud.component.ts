import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationModel } from '../../models/notification.model';
import { BsModalService } from 'ngx-bootstrap/modal/public_api';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'notification-crud',
  templateUrl: './notification-crud.component.html',
  styleUrls: ['./notification-crud.component.css']
})
export class NotificationCrudComponent implements OnInit {

  title: string;

  action: string;
  id: string;
  notification: NotificationModel;

  form: FormGroup;
  visibleControls;

  constructor(private router: ActivatedRoute, private notificationService: NotificationService, private productService: ProductService) {

  }

  ngOnInit() {
    this.id = this.router.snapshot.params.id;
    this.action = this.router.snapshot.params.action;

    console.log(this.action + "->" + this.id);

    this.findById();
    this.findProductById();


    //Default
    this.visibleControls = {
      id: true,
      product: true,
      creationDate: true,
      sentDate: true,
      state: true
    };

    //Action
    switch (this.action) {
      case "view":
        this.view();
        break;
    }

  }

  findById() {
    this.notificationService.findById(this.id)
      .subscribe(notification => { console.log("notification:" + notification); this.notification = notification });
  }

  findProductById() {
    this.productService.findById("5da7b4691ce48808eb073130")
      .subscribe(product => { console.log("product:" + product); });
  }

  view() {

    this.title = "View notification";

    this.form = new FormGroup({
      id: new FormControl({ value: "id", disabled: true }),
      product: new FormControl({ value: this.notification.product, disabled: false }),
      creationDate: new FormControl({ value: "creationDate", disabled: false }),
      sentDate: new FormControl({ value: "sentDate", disabled: false }),
      state: new FormControl({ value: "A", disabled: false })
    });

  }


}
