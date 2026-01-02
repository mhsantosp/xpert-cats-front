import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('AppComponent', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule.withRoutes(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render only router-outlet (no shell) on auth routes', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await router.navigateByUrl('/login');
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // En rutas de auth no debe renderizarse el shell
    expect(compiled.querySelector('.app-shell')).toBeNull();
  });

  it('should render the app shell on non-auth routes', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await router.navigateByUrl('/cats');
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // En rutas normales debe aparecer el shell con toolbar
    expect(compiled.querySelector('.app-shell')).not.toBeNull();
    expect(compiled.querySelector('.app-header')).not.toBeNull();
  });
});
