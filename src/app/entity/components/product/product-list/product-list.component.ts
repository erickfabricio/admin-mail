import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntityService } from 'src/app/entity/services/entity.service';
import { ProductModel } from 'src/app/entity/models/product.model';

@Component({
  selector: 'mail-entity-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //Filter
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<ProductModel>;

  //List
  products: ProductModel[];
    
  constructor(private entityService: EntityService) { }

  ngOnInit() {
    this.displayedColumns = ['#', 'id', 'service', 'name', 'mail', 'description', 'state', 'date'];
    this.dataSource = new MatTableDataSource<ProductModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
    this.find();
  }

  find() {
    this.entityService.find(ProductModel.entity)
      .subscribe(products => { /*console.log(products);*/ this.products = <ProductModel[]>products; this.dataSource.data = this.products });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //************ EVENTS ************//
  @Output() eventCrud = new EventEmitter<any>();
  eventCrudEmitter(action: string, product: ProductModel) {
    return this.eventCrud.emit({action, product});
  }

}
