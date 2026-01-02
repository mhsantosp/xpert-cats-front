import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AuthApiService } from '../../../../data/auth-api.service';

declare const jasmine: any;

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authApiSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    authApiSpy = jasmine.createSpyObj('AuthApiService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: AuthApiService, useValue: authApiSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
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
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should call AuthApiService.register and navigate to /login on successful registration', () => {
    authApiSpy.register.and.returnValue(of({}));

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
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set registerFailed to true when registration API fails', () => {
    authApiSpy.register.and.returnValue(throwError(() => new Error('Registration failed')));

    component.username = 'john';
    component.email = 'john@example.com';
    component.password = 'secret';
    component.confirmPassword = 'secret';

    component.onSubmit();

    expect(authApiSpy.register).toHaveBeenCalled();
    expect(component.registerFailed).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
