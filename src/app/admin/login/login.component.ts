import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/authentication-service";

interface Response {
    response: string;
    result: {
        token: string;
    }
}

@Component({
    selector: 'bs-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    //Wenn im Formular auf abschicken gedruckt wir
    login() {
        const val = this.loginForm.value; //Alle infos aus Formular als Array
        if (val.username && val.password) {
            this.authService.login(val.username, val.password).subscribe(res => {
                const resObj = res as Response; //Aktuelles resultat muss vom Typ des Interfaces sein (siehe oben)
                if (resObj.response === "success") {
                    console.log(resObj);
                    this.authService.setLocalStorage(resObj.result.token); //AuthService braucht token
                    this.router.navigateByUrl(('/')); //zurück zur Startseite
                }
            })
        }
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    logout() {
        return this.authService.logout();
    }

    getUserFirstName(){
        return this.authService.getUserFirstName();
    }

    getUserLastName(){
        return this.authService.getUserLastName();
    }


    getAddress(){
        return this.authService.getAddress();
    }

    isAdmin(){
        return this.authService.isAdmin();
    }
}
