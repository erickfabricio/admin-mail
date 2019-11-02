import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NotificationCrudComponent } from '../notification-crud/notification-crud.component';

@Component({
  selector: 'mail-entity-notification-main',
  templateUrl: './notification-main.component.html',
  styleUrls: ['./notification-main.component.css']
})
export class NotificationMainComponent implements OnInit {

  @ViewChild("tabGroup", { static: true }) tabGroup;
  @ViewChild("tabList", { static: true }) tabList;
  @ViewChild("list", { static: true }) list: NotificationListComponent;
  @ViewChild("tabCrud", { static: true }) tabCrud;
  @ViewChild("crud", { static: true }) crud: NotificationCrudComponent;
  view: string;

  constructor() { }

  ngOnInit() {
    this.view = "LIST";
    this.captureEventList();
    this.captureEventCrud();    
  }

  captureEventList() {
    this.list.eventCrud.pipe().subscribe(data => {
      //Data      
      //console.log(data.action);
      //console.log(data.notification);

      //Send data to CRUD
      this.crud.action = data.action;
      this.crud.notification = data.notification;
      this.crud.show();

      //Change and enable tag      
      this.tabCrud.textLabel = "Notification";
      this.tabCrud.disabled = false;
      this.tabGroup.selectedIndex = 1;

      //Show mat-tab-header
      this.view = "CRUD";

    });
  }

  captureEventCrud() {
    this.crud.eventUpdateList.pipe().subscribe(isUpdateList => {
      //Data
      //console.log("Update list:" + isUpdateList);
      
      if (isUpdateList) {
        this.list.find();
      };

      if (this.crud.action == "DELETE") {
        this.tabGroup.selectedIndex = 0;
      }
      
    });    
  }

  onChangeTab(event: MatTabChangeEvent) {
    //console.log("Tag change:" + event.tab.textLabel);
    if (this.tabGroup.selectedIndex == 0) {
      this.tabCrud.textLabel = "";
      this.tabCrud.disabled = true;
      this.view = "LIST";
    }
  }  

}
