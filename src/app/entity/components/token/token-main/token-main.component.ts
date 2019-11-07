import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TokenListComponent } from '../token-list/token-list.component';
import { TokenCrudComponent } from '../token-crud/token-crud.component';
import { ApplicationModel } from 'src/app/entity/models/application.model';

@Component({
  selector: 'mail-entity-token-main',
  templateUrl: './token-main.component.html',
  styleUrls: ['./token-main.component.css']
})
export class TokenMainComponent implements OnInit {

  @Input() application: ApplicationModel;

  @ViewChild("tabGroup", { static: true }) tabGroup;
  @ViewChild("tabList", { static: true }) tabList;
  @ViewChild("list", { static: true }) list: TokenListComponent;
  @ViewChild("tabCrud", { static: true }) tabCrud;
  @ViewChild("crud", { static: true }) crud: TokenCrudComponent;
  view: string;

  constructor() { }

  ngOnInit() {    
    this.view = "LIST";
    this.captureEventList();
    this.captureEventCrud();    
  }

  ver(){
    this.list.application = this.application;
    this.list.tokens = this.application.tokens;
    this.crud.application = this.application;
  }

  captureEventList() {
    this.list.eventCrud.pipe().subscribe(data => {
      //Data      
      //console.log(data.action);
      //console.log(data.token);

      //Send data to CRUD
      this.crud.action = data.action;
      this.crud.token = data.token;
      this.crud.show();

      //Change and enable tag      
      this.tabCrud.textLabel = "Token";
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
        //this.list.find();
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
