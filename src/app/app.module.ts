//Alle Teile, aller Elemente werden hier zusammengefasst
//Alles was verwendet wir, muss hier registriert sein
//module = klasse

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {BookListComponent} from './book-list/book-list.component';
import {BookListItemComponent} from './book-list-item/book-list-item.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookStoreService} from "./shared/book-store.service";
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BookFormComponent} from './book-form/book-form.component';
import {LoginComponent} from './admin/login/login.component';
import {AuthService} from "./shared/authentication-service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';
import { HomeBookListComponent } from './home-book-list/home-book-list.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import {AdministrationComponent} from "./admin/administration/administration.component";
import { NewOrderComponent } from './new-order/new-order.component';
import { AdministrationOrderDetailsComponent } from './admin/administration-order-details/administration-order-details.component';
import { AdministrationOrderListComponent } from './admin/administration-order-list/administration-order-list.component';

@NgModule({
    declarations: [
        AppComponent,
        BookListComponent,
        BookListItemComponent,
        BookDetailsComponent,
        HomeComponent,
        BookFormComponent,
        LoginComponent,
        ShoppingCartComponent,
        ShoppingCartItemComponent,
        HomeBookListComponent,
        UserAccountComponent,
        OrderListComponent,
        OrderDetailsComponent,
        OrderListItemComponent,
        AdministrationComponent,
        NewOrderComponent,
        AdministrationOrderDetailsComponent,
        AdministrationOrderListComponent,
    ],
    imports: [
        BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
    ],
    providers: [
        BookStoreService, AuthService, {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

