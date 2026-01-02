import { ComponentFixture, TestBed } from '@angular/core/testing';

declare const jasmine: any;
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthApiService } from '../../../../data/auth-api.service';
import { AuthService } from '../../../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authApiSpy: any;
  let authServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    authApiSpy = jasmine.createSpyObj('AuthApiService', ['login']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['setSession', 'isLoggedIn', 'logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthApiService, useValue: authApiSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
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

    authApiSpy.login.and.returnValue(of(mockResponse));

    component.username = 'john';
    component.password = 'secret';

    component.onSubmit();

    expect(authApiSpy.login).toHaveBeenCalledWith({ username: 'john', password: 'secret' });
    expect(authServiceSpy.setSession).toHaveBeenCalledWith('fake-token', {
      username: 'john',
      email: 'john@example.com',
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cats']);
    expect(component.loginFailed).toBe(false);
  });

  it('should set loginFailed to true when login fails', () => {
    authApiSpy.login.and.returnValue(throwError(() => new Error('Invalid credentials')));

    component.username = 'wrong';
    component.password = 'wrong';

    component.onSubmit();

    expect(authApiSpy.login).toHaveBeenCalled();
    expect(component.loginFailed).toBe(true);
    expect(authServiceSpy.setSession).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
