import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ajusta esta URL al puerto donde corre tu backend .NET
const API_BASE_URL = 'http://localhost:5195';

export interface CatBreedDto {
  id: string;
  name: string;
  origin: string;
  description: string;
  temperament: string;
  lifeSpan: string;
}

export interface CatImageDto {
  id: string;
  url: string;
  breedId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CatsApiService {
  constructor(private readonly http: HttpClient) {}

  getBreeds(): Observable<CatBreedDto[]> {
    return this.http.get<CatBreedDto[]>(`${API_BASE_URL}/breeds`);
  }

  getBreedById(breedId: string): Observable<CatBreedDto> {
    return this.http.get<CatBreedDto>(`${API_BASE_URL}/breeds/${breedId}`);
  }

  searchBreeds(query: string): Observable<CatBreedDto[]> {
    return this.http.get<CatBreedDto[]>(`${API_BASE_URL}/breeds/search`, {
      params: { q: query },
    });
  }

  getImagesByBreedId(breedId: string): Observable<CatImageDto[]> {
    return this.http.get<CatImageDto[]>(`${API_BASE_URL}/imagesbybreedid`, {
      params: { breed_id: breedId },
    });
  }
}
