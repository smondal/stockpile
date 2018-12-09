import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService, AlertService, AuthenticationService } from '../_services';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  loading = false;
  isAdmin = false;

  constructor(
    private formBuilder: FormBuilder,
    private productservice: ProductService,
    private alertservice: AlertService,
    private router: Router,
    private authenticationservice: AuthenticationService,
    ) { };

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.isAdmin = this.authenticationservice.isAdmin();
  }

  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.productForm.value);
    this.productservice.create(this.productForm.value).pipe(first())
    .subscribe(
      data => {
        this.alertservice.success('Product create successful', true);
        this.router.navigate(['/list-product']);
      },
      error => {
        this.alertservice.error(error);
        this.loading = false;
      });
  }
}



