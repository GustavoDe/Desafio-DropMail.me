import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  sendNotification(title_notification: string, email: any) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title_notification, {
        body: 'Seu carro novo está qui',
        icon: 'caminho/para/o/ícone.png'
      });

      notification.onclick = () => {
        window.location.href = 'localhost:4000';
      };

    }

  }
}
