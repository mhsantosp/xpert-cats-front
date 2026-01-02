import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { ProfileComponent } from './profile.component';
import { AuthService, AuthUser } from '../../../../core/services/auth.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    authServiceSpy = {
      getCurrentUser: vi.fn(),
      logout: vi.fn(),
    };
    routerSpy = {
      navigate: vi.fn(),
    };

    const mockUser: AuthUser = {
      username: 'john',
      email: 'john@example.com',
    };
    authServiceSpy.getCurrentUser.mockReturnValue(mockUser);

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current user from AuthService on construction', () => {
    expect(authServiceSpy.getCurrentUser).toHaveBeenCalled();
    expect(component.user).toEqual({
      username: 'john',
      email: 'john@example.com',
    });
  });

  it('should logout and navigate to /login', () => {
    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
