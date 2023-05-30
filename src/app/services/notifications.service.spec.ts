import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notifications.service';
import { NotificationType } from '../types/notification.type';
import { NotificationInterface } from '@interfaces/notification.interface';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    notificationService = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('addNotification should create notification', ()=>{
    const notificationType: NotificationType = 'error';
    const message: string = 'Message';

    notificationService.addNotification(notificationType, message);
    expect(notificationService['notifications'].length).toBeGreaterThan(0);
  });

  it('removeNotification should delete notification', ()=>{
    const notificationType: NotificationType = 'error';
    const message: string = 'Message';
    const notification: NotificationInterface = {
      type: notificationType,
      message
    };

    notificationService.addNotification(notificationType, message);
    const currentNotifications: number = notificationService['notifications'].length;
    expect(currentNotifications).toBeGreaterThan(0);
    notificationService.removeNotification(notification);
    expect(notificationService['notifications'].length).toBeLessThan(currentNotifications);
  });
});
