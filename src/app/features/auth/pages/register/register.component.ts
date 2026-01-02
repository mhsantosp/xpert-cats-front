import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthApiService } from '../../../../data/auth-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  registerFailed = false;

  constructor(
    private readonly authApi: AuthApiService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    this.registerFailed = false;

    if (this.password !== this.confirmPassword) {
      this.registerFailed = true;
      return;
    }

    this.authApi
      .register({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: () => {
          // Tras registrar correctamente, redirigimos a la pantalla de login
          void this.router.navigate(['/login']);
        },
        error: () => {
          this.registerFailed = true;
        },
      });
  }
}
