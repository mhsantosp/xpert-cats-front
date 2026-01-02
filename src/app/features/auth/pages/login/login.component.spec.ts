import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthApiService } from '../../../../data/auth-api.service';
import { AuthService } from '../../../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authApiSpy: any;
  let authServiceSpy: any;
  let router: Router;
  let navigateSpy: any;

  beforeEach(async () => {
    authApiSpy = {
      login: vi.fn(),
    };
    authServiceSpy = {
      setSession: vi.fn(),
      isLoggedIn: vi.fn(),
      logout: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      providers: [
        { provide: AuthApiService, useValue: authApiSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthApiService.login and navigate to /cats on successful login', () => {
    const mockResponse = {
      token: 'fake-token',
      username: 'john',
      email: 'john@example.com',
    };

    authApiSpy.login.mockReturnValue(of(mockResponse));

    component.username = 'john';
    component.password = 'secret';

    component.onSubmit();

    expect(authApiSpy.login).toHaveBeenCalledWith({ username: 'john', password: 'secret' });
    expect(authServiceSpy.setSession).toHaveBeenCalledWith('fake-token', {
      username: 'john',
      email: 'john@example.com',
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/cats']);
    expect(component.loginFailed).toBe(false);
  });

  it('should set loginFailed to true when login fails', () => {
    authApiSpy.login.mockReturnValue(throwError(() => new Error('Invalid credentials')));

    component.username = 'wrong';
    component.password = 'wrong';

    component.onSubmit();

    expect(authApiSpy.login).toHaveBeenCalled();
    expect(component.loginFailed).toBe(true);
    expect(authServiceSpy.setSession).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
