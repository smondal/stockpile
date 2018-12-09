import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Product } from '../_models';

@Injectable({ providedIn: 'root' })
export class ProductService{
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>(`${environment.apiUrl}/api/products`);
  }

  create(product: Product) {
    return this.http.post(`${environment.apiUrl}/api/products`, product);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/products` + '/' + id, {responseType: 'text'});
  }
}
