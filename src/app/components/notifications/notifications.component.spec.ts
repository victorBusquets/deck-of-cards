import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { NotificationService } from '@services/notifications.service';
import { NotificationInterface } from '@interfaces/notification.interface';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationsComponent]
    });
    fixture = TestBed.createComponent(NotificationsComponent);
    notificationService = TestBed.inject(NotificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removeNotifiation should call notificationService.removeNotification()', ()=>{
    const spy = spyOn(notificationService, 'removeNotification');
    const notification: NotificationInterface = {type: 'error', message: 'Message'};
    component.removeNotifiation(notification);

    expect(spy).toHaveBeenCalled();
  });
});
