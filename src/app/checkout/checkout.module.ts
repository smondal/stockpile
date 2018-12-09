import { CheckoutRoutingModule } from './checkout.routing';
import { CheckoutNavbarComponent } from './checkout-navbar/checkout-navbar.component';
import { ResultComponent } from './result/result.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';

@NgModule({
	imports: [ CommonModule, CheckoutRoutingModule ],
	declarations: [
		CheckoutComponent,
		ProductsComponent,
		ResultComponent,
		CheckoutNavbarComponent
	],
	exports: [ CheckoutComponent ]
})
export class CheckoutModule {}
