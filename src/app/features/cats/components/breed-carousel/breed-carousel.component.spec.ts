import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedCarouselComponent } from './breed-carousel.component';

describe('BreedCarouselComponent', () => {
  let component: BreedCarouselComponent;
  let fixture: ComponentFixture<BreedCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
