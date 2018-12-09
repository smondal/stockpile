import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ProductService, AlertService } from '../_services';
import { Product, User } from '../_models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  products: Product[];
  isAdmin: boolean;

  constructor(
    private productservice: ProductService,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.productservice.getAll().subscribe(data => { this.products = data; });
    this.isAdmin = this.authenticationService.isAdmin();
  }

  deleteProduct(product: Product): void {
    this.productservice.delete(product._id)
      .subscribe(
          data => {
            this.alertService.success('Product successful deleted', true);
            this.products = this.products.filter(u => u !== product);
          },
          error => {
            this.alertService.error(error);
          });
  };

  editProduct(product: Product): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", product._id.toString());
    this.router.navigate(['edit-user']);
  };

  addProduct(): void {
    this.router.navigate(['add-product']);
  };
}
