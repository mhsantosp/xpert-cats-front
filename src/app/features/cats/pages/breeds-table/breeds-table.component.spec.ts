import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BreedsTableComponent } from './breeds-table.component';
import { CatsApiService, CatBreedDto } from '../../../../data/cats-api.service';

declare const jasmine: any;

describe('BreedsTableComponent', () => {
  let component: BreedsTableComponent;
  let fixture: ComponentFixture<BreedsTableComponent>;
  let catsApiSpy: any;

  beforeEach(async () => {
    catsApiSpy = jasmine.createSpyObj('CatsApiService', ['getBreeds']);

    await TestBed.configureTestingModule({
      imports: [BreedsTableComponent],
      providers: [{ provide: CatsApiService, useValue: catsApiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedsTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load breeds on init and keep filteredBreeds empty when there is no search term', () => {
    const breeds: CatBreedDto[] = [
      {
        id: 'abys',
        name: 'Abyssinian',
        origin: 'Egypt',
        description: 'Desc',
        temperament: 'Active',
        lifeSpan: '14',
      },
      {
        id: 'aege',
        name: 'Aegean',
        origin: 'Greece',
        description: 'Desc',
        temperament: 'Friendly',
        lifeSpan: '13',
      },
    ];

    catsApiSpy.getBreeds.and.returnValue(of(breeds));

    component.ngOnInit();

    expect(catsApiSpy.getBreeds).toHaveBeenCalled();
    expect(component.breeds.length).toBe(2);
    expect(component.filteredBreeds.length).toBe(0);
  });

  it('should filter breeds when onSearch is called with a term', () => {
    const breeds: CatBreedDto[] = [
      {
        id: 'abys',
        name: 'Abyssinian',
        origin: 'Egypt',
        description: 'Desc',
        temperament: 'Active',
        lifeSpan: '14',
      },
      {
        id: 'aege',
        name: 'Aegean',
        origin: 'Greece',
        description: 'Desc',
        temperament: 'Friendly',
        lifeSpan: '13',
      },
    ];

    catsApiSpy.getBreeds.and.returnValue(of(breeds));

    component.ngOnInit();
    component.searchTerm = 'Aby';

    component.onSearch();

    expect(component.filteredBreeds.length).toBe(1);
    expect(component.filteredBreeds[0].id).toBe('abys');
  });

  it('should clear filteredBreeds when search term is empty', () => {
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

    catsApiSpy.getBreeds.and.returnValue(of(breeds));

    component.ngOnInit();
    component.searchTerm = 'abys';
    component.onSearch();

    // Ahora vaciamos el término de búsqueda
    component.onSearchChange('');

    expect(component.filteredBreeds.length).toBe(0);
  });
});
