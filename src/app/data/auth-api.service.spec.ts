import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthApiService, LoginRequestDto, RegisterRequestDto } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService],
    });

    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST /login with correct payload', () => {
    const payload: LoginRequestDto = { username: 'john', password: 'secret' };

    service.login(payload).subscribe();

    const req = httpMock.expectOne('http://localhost:5195/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush({});
  });

  it('should send POST /register with correct payload', () => {
    const payload: RegisterRequestDto = {
      username: 'john',
      email: 'john@example.com',
      password: 'secret',
    };

    service.register(payload).subscribe();

    const req = httpMock.expectOne('http://localhost:5195/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush({});
  });
});
