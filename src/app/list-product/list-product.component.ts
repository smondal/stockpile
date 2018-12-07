import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services';
import { Product } from '../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  products: Product[];

  constructor(private productservice: ProductService, private router: Router) { }

  ngOnInit() {
    this.productservice.getAll().subscribe(data => { this.products = data; });
  }

  deleteProduct(product: Product): void {
    this.productservice.delete(product.id)
      .subscribe(data => {
        this.products = this.products.filter(u => u !== product);
    })
  };

  editProduct(product: Product): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", product.id.toString());
    this.router.navigate(['edit-user']);
  };

  addProduct(): void {
    this.router.navigate(['add-user']);
  };
}
