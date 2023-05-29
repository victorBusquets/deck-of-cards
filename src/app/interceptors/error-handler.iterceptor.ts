import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log('error', error);
            return throwError(() => error);
        }));
  }
}