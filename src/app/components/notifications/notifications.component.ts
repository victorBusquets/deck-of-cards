import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationInterface } from '@interfaces/notification.interface';
import { NotificationService } from '@services/notifications.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent{
  notifications$!: Observable<NotificationInterface[]>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications$ = this.notificationService.getNotifications()
  }

  removeNotifiation(notification: NotificationInterface): void {
    this.notificationService.removeNotification(notification);
  }
}
