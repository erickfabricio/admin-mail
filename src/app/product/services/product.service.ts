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
    "Content-Type": "application/json"
  });

  constructor(private http: HttpClient) { }

  find(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.api).pipe(
      map(data => data.map(data => new ProductModel().deserialize(data)))
    );
  }

  findById(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.api}/${id}`);
  }

  saveProduct(product: ProductModel): Observable<ProductModel>{
    return this.http.post<ProductModel>(this.api, product);
  }

  updateProduct(product: ProductModel): Observable<ProductModel>{
    return this.http.put<ProductModel>(`${this.api}/${product._id}`, product);
  }

  remove(product: ProductModel): Observable<ProductModel>{
    return this.http.delete<ProductModel>(`${this.api}/${product._id}`);
  }

}
