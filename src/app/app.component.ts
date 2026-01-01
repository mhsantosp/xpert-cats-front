import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected readonly title = signal('xpert-cats-front');

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isLoginRoute(): boolean {
    return this.router.url.startsWith('/login');
  }

  onLogout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
