import { Injectable } from '@angular/core';
import { NotificationInterface } from '@interfaces/notification.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationType } from '../types/notification.type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationDuration: number = 3000;
  private notifications: NotificationInterface[] = [];
  private notifications$: BehaviorSubject<NotificationInterface[]> = new BehaviorSubject(this.notifications);
  
  addNotification(type: NotificationType, message: string): void {
    const notification: NotificationInterface = {message, type};
    this.notifications.push(notification);
    this.notifications$.next(this.notifications);
    setTimeout(()=> this.removeNotification(notification), this.notificationDuration);
  }
  
  removeNotification(notification: NotificationInterface): void {
    const index: number = this.notifications.findIndex((notificationItem)=>notificationItem.message === notification.message);

    if (index > -1) {
      this.notifications.splice(index, 1);
      this.notifications$.next(this.notifications);
    }
  }

  getNotifications(): Observable<NotificationInterface[]> {
    return this.notifications$.asObservable();
  }
}
