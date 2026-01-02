import { Routes } from '@angular/router';
import { CatsHomeComponent } from './features/cats/pages/cats-home/cats-home.component';
import { BreedsTableComponent } from './features/cats/pages/breeds-table/breeds-table.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ProfileComponent } from './features/auth/pages/profile/profile.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'cats', component: CatsHomeComponent },
  { path: 'cats/breeds', component: BreedsTableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];
