import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ajusta esta URL al puerto donde corre tu backend .NET
const API_BASE_URL = 'http://localhost:5195';

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface RegisterRequestDto {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponseDto {
  id: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly http: HttpClient) {}

  login(payload: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${API_BASE_URL}/login`, payload);
  }

  register(payload: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${API_BASE_URL}/register`, payload);
  }
}
