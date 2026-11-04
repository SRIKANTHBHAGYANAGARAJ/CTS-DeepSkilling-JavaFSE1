import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

// Explanation for Hands-On 6 Step 67:
// Providing NotificationService at the component level via providers: [NotificationService] creates a new,
// isolated instance of NotificationService scoped exclusively to this component and its child components,
// rather than using the root-level application singleton instance.
@Component({
  selector: 'app-notification',
  standalone: true,
  providers: [NotificationService],
  template: `
    <div class="notification-box">
      <h5>Scoped Component Notification Service</h5>
      <p>Instance: Component-level scoped provider</p>
    </div>
  `,
  styles: [`
    .notification-box {
      background-color: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: 6px;
      padding: 10px;
      margin: 10px 0;
    }
  `]
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}
}
