import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  sendNotification(title_notification: string, subtitle: string) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title_notification, {
        body: subtitle,
        icon: 'caminho/para/o/ícone.png'
      });

      notification.onclick = () => {
        if (window.focus) {
          window.focus();
        }
      };

    }

  }
}
