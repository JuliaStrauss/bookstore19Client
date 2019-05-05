// holt sich aktuellen Http Request
// Was ist in Request drinnen?
// Request wird geklont
// SetHeader fügt zu aktuellen HEader einen weiteren Token hinz
// Es wird quasi der Token an den aktuellen Reqeust angefügt
// next Methode wird aufgerufen und Reqeust wird freigegeben
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return next.handle(request);
    }
}