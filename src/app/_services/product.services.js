import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Product } from '../_models';

@Injectable({ providedIn: 'root' })
export class ProductService{
	constructor(private http: HttpClient) { }
	
	getAll() {
		this.http.get<Product[]>(`${environment.apiUrl}/api/products`);
	}

	create(){
		this.http.post(`{environment.apiUrl}/api/products}`, product)
	}
} 