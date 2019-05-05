import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BookDetailsComponent} from './book-details/book-details.component';
import {BookListComponent} from './book-list/book-list.component';
import {HomeComponent} from './home/home.component';
import {BookFormComponent} from "./book-form/book-form.component";
import {LoginComponent} from "./admin/login/login.component";
import {AuthService} from "./shared/authentication-service";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ShoppingCartItemComponent} from "./shopping-cart-item/shopping-cart-item.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {UserAccountComponent} from "./user-account/user-account.component";
import {AdministrationComponent} from "./admin/administration/administration.component";
import {NewOrderComponent} from "./new-order/new-order.component";
import {AdministrationOrderDetailsComponent} from "./admin/administration-order-details/administration-order-details.component";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    {path: 'home', component: HomeComponent},
    {path: 'home/:isbn', component: BookDetailsComponent},

    {path: 'books', component: BookListComponent},
    {path: 'books/:isbn', component: BookDetailsComponent},

    {path: 'admin', component: BookFormComponent},
    {path: 'admin/:isbn', component: BookFormComponent},

    {path: 'login', component: LoginComponent},
    {path: 'konto', component: UserAccountComponent},

    {path: 'shoppingcart', component: ShoppingCartComponent},
    {path: 'shoppingcart/:isbn', component: BookDetailsComponent},

    {path: 'order', component: OrderListComponent},
    {path: 'order/:id', component: OrderDetailsComponent},
    {path: 'neworder', component: NewOrderComponent},

    {path: 'administration', component: AdministrationComponent},
    {path: 'administration/:id', component: AdministrationOrderDetailsComponent},

    {path: 'form', component: BookFormComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}