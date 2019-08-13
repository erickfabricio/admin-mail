import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { NotificationModel } from 'src/app/notification/models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: NotificationModel[];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAllNotifications();
  }

  public getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe(notifications => {console.log(notifications); this.notifications = notifications});
  }

}
