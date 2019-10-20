import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { ProductModel } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api : string = 'http://localhost:3000/api/products';  

  headers : HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFQUCIsIm5hbWUiOiJUZXN0LURldiIsInN0YXRlIjoiQSIsImlhdCI6MTU3MTU0MDQxNn0.gZcTHjD9hYzgAL0hh3nJpra55OVgRNdTImTIeDA3l5o'
  });

  options = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { 
    
  }

  find(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.api, this.options).pipe(
      map(data => data.map(data => new ProductModel().deserialize(data)))
    );
  }

  findById(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.api}/${id}`, this.options);
  }

  save(product: ProductModel): Observable<ProductModel>{
    return this.http.post<ProductModel>(this.api, product, this.options);
  }

  update(product: ProductModel): Observable<ProductModel>{
    return this.http.put<ProductModel>(`${this.api}/${product._id}`, product, this.options);
  }

  remove(product: ProductModel): Observable<ProductModel>{
    return this.http.delete<ProductModel>(`${this.api}/${product._id}`, this.options);
  }

}
