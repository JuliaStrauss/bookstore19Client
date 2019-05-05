import {Component} from '@angular/core';
import {Book} from './shared/book';
import {AuthService} from "./shared/authentication-service";

@Component({
    selector: 'bs-root',
    templateUrl: './app.component.html',
    styles: []
})

export class AppComponent {
    constructor(private authService: AuthService) {

    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    isLoggedOut() {
        return this.authService.isLoggedOut();
    }

    isAdmin(){
        return this.authService.isAdmin();
    }

    getLoginLabel() {
        if (this.isLoggedIn()) {
            return "Konto";
        }
        return "Login";
    }
}
