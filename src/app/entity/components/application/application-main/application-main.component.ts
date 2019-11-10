import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ApplicationListComponent } from '../application-list/application-list.component';
import { ApplicationCrudComponent } from '../application-crud/application-crud.component';

@Component({
  selector: 'mail-entity-application-main',
  templateUrl: './application-main.component.html',
  styleUrls: ['./application-main.component.css']
})
export class ApplicationMainComponent implements OnInit {

  @ViewChild("tabGroup", { static: true }) tabGroup;
  @ViewChild("tabList", { static: true }) tabList;
  @ViewChild("list", { static: true }) list: ApplicationListComponent;
  @ViewChild("tabCrud", { static: true }) tabCrud;
  @ViewChild("crud", { static: true }) crud: ApplicationCrudComponent;
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
      //console.log(data.application);

      //Send data to CRUD
      this.crud.action = data.action;
      this.crud.application = data.application;        
      this.crud.show();

      //Change and enable tag      
      this.tabCrud.textLabel = "Application";
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
