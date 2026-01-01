import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailCardComponent } from './breed-detail-card.component';

describe('BreedDetailCardComponent', () => {
  let component: BreedDetailCardComponent;
  let fixture: ComponentFixture<BreedDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedDetailCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedDetailCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
