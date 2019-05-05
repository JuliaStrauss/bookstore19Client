import {Injectable, Input} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from 'rxjs/operators';

//npm install --save-dev jwt-decode

interface User {
    result: {
        created_at: Date,
        email: string,
        id: number,
        name: string,
        admin: number,
        firstname: string,
        lastname: string,
        address:string,
        updated_at: Date
    }
}

@Injectable()
export class AuthService {

    private api: string = 'http://bookstore19.s1610456034.student.kwmhgb.at/api/auth';

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
    }

    public setCurrentUserId() {
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res => {
                localStorage.setItem('userId', res.result.id.toString());
            }
        );
    }

    //ließt aktuelle Id aus LocalStorage aus
    public getCurrentUserId() {
        return Number.parseInt(localStorage.getItem('userId'));
    }

    //Speichert Token in LocalStorage
    public setLocalStorage(token: string) {
        console.log("Storing token");
        console.log(token);
        const decodedToken = decode(token);
        console.log(decodedToken);
        console.log(decodedToken.user.id);
        console.log(decodedToken.user.admin);
        console.log(decodedToken.user.address);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
        localStorage.setItem('admin', decodedToken.user.admin);
        localStorage.setItem('address', decodedToken.user.address)
        localStorage.setItem('firstname', decodedToken.user.firstname);
        localStorage.setItem('lastname', decodedToken.user.lastname);
        localStorage.setItem('email', decodedToken.user.email);
    }

    public logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        console.log("logged out");
    }

    //Gibts einen aktuellen Token
    public isLoggedIn() {
        return !isNullOrUndefined(localStorage.getItem("token"));
    }

    //Gibts keinen aktuellen Token?
    isLoggedOut() {
        localStorage.removeItem('admin');
        return !this.isLoggedIn();

    }

    public isAdmin(){
        let admin = Number.parseInt(localStorage.getItem('admin'));
        if(this.isLoggedIn()){
            if(admin == 1){
                return true;
            }
            return false;
        }
        return false;
    }

    public getUserFirstName(){
        return localStorage.getItem('firstname');
    }

    public getUserLastName(){
        return localStorage.getItem('lastname');
    }

    public getAddress(){
        return (localStorage.getItem('address'));
    }

}