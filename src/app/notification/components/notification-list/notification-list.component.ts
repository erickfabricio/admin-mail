import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../../models/notification.model';
import { NotificationService } from '../../services/notification.service';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


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
    this.find();
  }

  find() {
    this.notificationService.find().subscribe(notifications => {console.log(notifications); this.notifications = notifications});
  }

}
