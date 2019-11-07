import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntityService } from 'src/app/entity/services/entity.service';
import { ApplicationModel } from 'src/app/entity/models/application.model';

@Component({
  selector: 'mail-entity-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  //Filter
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<ApplicationModel>;

  //List
  applications: ApplicationModel[];
    
  constructor(private entityService: EntityService) { }

  ngOnInit() {
    this.displayedColumns = ['#', 'id', 'name', 'creationDate', 'state'];
    this.dataSource = new MatTableDataSource<ApplicationModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
    this.find();
  }

  find() {
    this.entityService.find(ApplicationModel.entity)
      .subscribe(applications => { /*console.log(applications);*/ this.applications = <ApplicationModel[]>applications; this.dataSource.data = this.applications });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //************ EVENTS ************//
  @Output() eventCrud = new EventEmitter<any>();
  eventCrudEmitter(action: string, application: ApplicationModel) {
    return this.eventCrud.emit({action, application});
  }

}
