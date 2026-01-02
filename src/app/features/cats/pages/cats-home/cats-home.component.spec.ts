import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { CatsHomeComponent } from './cats-home.component';
import { CatsApiService, CatBreedDto, CatImageDto } from '../../../../data/cats-api.service';

describe('CatsHomeComponent', () => {
  let component: CatsHomeComponent;
  let fixture: ComponentFixture<CatsHomeComponent>;
  let catsApiSpy: any;

  beforeEach(async () => {
    catsApiSpy = {
      getBreeds: vi.fn(),
      getImagesByBreedId: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CatsHomeComponent],
      providers: [{ provide: CatsApiService, useValue: catsApiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CatsHomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load breeds on init', () => {
    const breeds: CatBreedDto[] = [
      {
        id: 'abys',
        name: 'Abyssinian',
        origin: 'Egypt',
        description: 'Desc',
        temperament: 'Active',
        lifeSpan: '14',
      },
    ];

    catsApiSpy.getBreeds.mockReturnValue(of(breeds));

    component.ngOnInit();

    expect(catsApiSpy.getBreeds).toHaveBeenCalled();
    expect(component.breeds.length).toBe(1);
    expect(component.breeds[0]).toEqual({
      id: 'abys',
      name: 'Abyssinian',
      origin: 'Egypt',
      lifeSpan: '14',
      temperament: 'Active',
      description: 'Desc',
      imageUrls: [],
    });
  });

  it('should load images for selected breed when onBreedChange is called', () => {
    const breeds: CatBreedDto[] = [
      {
        id: 'abys',
        name: 'Abyssinian',
        origin: 'Egypt',
        description: 'Desc',
        temperament: 'Active',
        lifeSpan: '14',
      },
    ];

    const images: CatImageDto[] = [
      { id: '1', url: 'http://image1', breedId: 'abys' },
      { id: '2', url: 'http://image2', breedId: 'abys' },
    ];

    catsApiSpy.getBreeds.mockReturnValue(of(breeds));
    catsApiSpy.getImagesByBreedId.mockReturnValue(of(images));

    component.ngOnInit();
    // Simular que el usuario selecciona la raza
    component.selectedBreedId = 'abys';

    component.onBreedChange();

    expect(catsApiSpy.getImagesByBreedId).toHaveBeenCalledWith('abys');
    expect(component.selectedBreed?.imageUrls).toEqual(['http://image1', 'http://image2']);
    expect(component.currentImageIndex).toBe(0);
  });
});
