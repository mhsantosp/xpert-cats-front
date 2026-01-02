import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthApiService } from '../../../../data/auth-api.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  loginFailed = false;

  constructor(
    private readonly authService: AuthService,
    private readonly authApi: AuthApiService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    this.loginFailed = false;

    this.authApi
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          this.authService.setSession(response.token, {
            username: response.username,
            email: response.email,
          });
          void this.router.navigate(['/profile']);
        },
        error: () => {
          this.loginFailed = true;
        },
      });
  }
}
