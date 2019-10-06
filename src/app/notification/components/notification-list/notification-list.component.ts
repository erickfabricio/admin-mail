import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../../models/notification.model';
import { NotificationService } from '../../services/notification.service';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationModalViewComponent } from '../notification-modal-view/notification-modal-view.component';


@Component({
  selector: 'notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notifications: NotificationModel[];

  modal: BsModalRef;

  constructor(private notificationService: NotificationService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe(notifications => {console.log(notifications); this.notifications = notifications});
  }

  view(notification: NotificationModel) {
    this.modal = this.modalService.show(NotificationModalViewComponent,  {
      initialState: {
        //action: "new",
        //title: 'Modal title',
        notification: notification,
        data: {}
      }
    });
  }
  

}
