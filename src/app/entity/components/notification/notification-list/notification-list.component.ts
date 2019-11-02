import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntityService } from 'src/app/entity/services/entity.service';
import { NotificationModel } from 'src/app/entity/models/notification.model';

@Component({
  selector: 'mail-entity-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  //Filter
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<NotificationModel>;

  //List
  notifications: NotificationModel[];
    
  constructor(private entityService: EntityService) { }

  ngOnInit() {
    this.displayedColumns = ['#', 'id', 'product', 'creationDate', 'sentDate', 'state'];
    this.dataSource = new MatTableDataSource<NotificationModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
    this.find();
  }

  find() {
    this.entityService.find(NotificationModel.entity)
      .subscribe(notifications => { /*console.log(notifications);*/ this.notifications = <NotificationModel[]>notifications; this.dataSource.data = this.notifications });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //************ EVENTS ************//
  @Output() eventCrud = new EventEmitter<any>();
  eventCrudEmitter(action: string, notification: NotificationModel) {
    return this.eventCrud.emit({action, notification});
  }

}
