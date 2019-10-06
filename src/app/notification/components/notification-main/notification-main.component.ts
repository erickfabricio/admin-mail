import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationModalNewComponent } from '../notification-modal-new/notification-modal-new.component';

@Component({
  selector: 'notification-main',
  templateUrl: './notification-main.component.html',
  styleUrls: ['./notification-main.component.css']
})
export class NotificationMainComponent implements OnInit {

  modal: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit() { }

  newNotification() {
    this.modal = this.modalService.show(NotificationModalNewComponent,  {
      initialState: {
        //action: "new",
        //title: 'Modal title',
        data: {}
      }
    });
  }
 
}
