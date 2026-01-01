import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLogged = !!localStorage.getItem('token');
    if (!isLogged) {
      this.router.navigate(['/login']);
    }
    return isLogged;
  }
}
