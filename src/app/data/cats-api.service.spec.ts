import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CatsApiService } from './cats-api.service';

describe('CatsApiService', () => {
  let service: CatsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatsApiService],
    });

    service = TestBed.inject(CatsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET /breeds when getBreeds is called', () => {
    service.getBreeds().subscribe();

    const req = httpMock.expectOne('http://localhost:5195/breeds');
    expect(req.request.method).toBe('GET');

    req.flush([]);
  });

  it('should GET /breeds/{id} when getBreedById is called', () => {
    service.getBreedById('abys').subscribe();

    const req = httpMock.expectOne('http://localhost:5195/breeds/abys');
    expect(req.request.method).toBe('GET');

    req.flush({});
  });

  it('should GET /breeds/search with query param when searchBreeds is called', () => {
    service.searchBreeds('aby').subscribe();

    const req = httpMock.expectOne(r => r.url === 'http://localhost:5195/breeds/search');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('q')).toBe('aby');

    req.flush([]);
  });

  it('should GET /imagesbybreedid with breed_id param when getImagesByBreedId is called', () => {
    service.getImagesByBreedId('abys').subscribe();

    const req = httpMock.expectOne(r => r.url === 'http://localhost:5195/imagesbybreedid');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('breed_id')).toBe('abys');

    req.flush([]);
  });
});
