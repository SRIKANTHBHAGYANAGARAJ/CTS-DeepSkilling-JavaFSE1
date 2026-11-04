import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The requested page URL does not exist on Student Course Portal.</p>
      <a routerLink="/" class="btn-primary">Return to Home</a>
    </div>
  `,
  styles: [`
    .not-found-page {
      text-align: center;
      padding: 3rem 1rem;
      background: white;
      border-radius: 8px;
    }
  `]
})
export class NotFoundComponent {}
