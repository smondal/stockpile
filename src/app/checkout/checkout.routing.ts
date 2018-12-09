import { CheckoutComponent } from './checkout.component';
import { ResultComponent } from './result/result.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../app/_guards/auth.guard';

export const checkoutRoutes: Routes = [
	{
		path: 'checkouts',
		component: CheckoutComponent,
		canActivate: [ AuthGuard ],
		children: [
			{
				path: '',
				component: ProductsComponent,
				outlet: 'checkOutlet'
			},
			{
				path: 'result',
				component: ResultComponent,
				outlet: 'checkOutlet'
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(checkoutRoutes) ],
	exports: [ RouterModule ]
})
export class CheckoutRoutingModule {}
