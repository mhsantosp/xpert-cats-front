import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { RegisterComponent } from './register.component';
import { AuthApiService } from '../../../../data/auth-api.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authApiSpy: any;
  let router: Router;
  let navigateSpy: any;

  beforeEach(async () => {
    authApiSpy = {
      register: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule],
      providers: [
        { provide: AuthApiService, useValue: authApiSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call register API when passwords do not match', () => {
    component.username = 'john';
    component.email = 'john@example.com';
    component.password = 'secret1';
    component.confirmPassword = 'secret2';

    component.onSubmit();

    expect(authApiSpy.register).not.toHaveBeenCalled();
    expect(component.registerFailed).toBe(true);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should call AuthApiService.register and navigate to /login on successful registration', () => {
    authApiSpy.register.mockReturnValue(of({}));

    component.username = 'john';
    component.email = 'john@example.com';
    component.password = 'secret';
    component.confirmPassword = 'secret';

    component.onSubmit();

    expect(authApiSpy.register).toHaveBeenCalledWith({
      username: 'john',
      email: 'john@example.com',
      password: 'secret',
    });
    expect(component.registerFailed).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should set registerFailed to true when registration API fails', () => {
    authApiSpy.register.mockReturnValue(throwError(() => new Error('Registration failed')));

    component.username = 'john';
    component.email = 'john@example.com';
    component.password = 'secret';
    component.confirmPassword = 'secret';

    component.onSubmit();

    expect(authApiSpy.register).toHaveBeenCalled();
    expect(component.registerFailed).toBe(true);
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
