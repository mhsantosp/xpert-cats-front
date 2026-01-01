import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  registerFailed = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  onSubmit(): void {
    this.registerFailed = false;

    if (this.password !== this.confirmPassword) {
      this.registerFailed = true;
      return;
    }

    const ok = this.authService.register(this.username, this.email, this.password);
    if (ok) {
      this.router.navigate(['/profile']);
    } else {
      this.registerFailed = true;
    }
  }
}
