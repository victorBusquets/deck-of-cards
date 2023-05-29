import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { NotificationService } from '@services/notifications.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
            this.notificationService.addNotification('error', 'Se ha producido un error.');
            return throwError(() => error);
        }));
  }
}