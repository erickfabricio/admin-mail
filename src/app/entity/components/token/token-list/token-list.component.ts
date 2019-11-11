import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntityService } from 'src/app/entity/services/entity.service';
import { TokenModel } from 'src/app/entity/models/token.model';
import { ApplicationModel } from 'src/app/entity/models/application.model';

@Component({
  selector: 'mail-entity-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent implements OnInit, OnChanges {

  //Filter
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<TokenModel>;

  //List
  @Input("application") application: ApplicationModel;
    
  constructor() { }

  ngOnChanges(){   
    if(this.application != null){
      this.dataSource.data = this.application.tokens;
    }        
  }

  ngOnInit() {    
    this.displayedColumns = ['#', 'id'];
    this.dataSource = new MatTableDataSource<TokenModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
    //this.dataSource.data = [];//this.application.tokens;
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //************ EVENTS ************//
  @Output() eventCrud = new EventEmitter<any>();
  eventCrudEmitter(action: string, token: TokenModel) {
    return this.eventCrud.emit({action, token});
  }

}
