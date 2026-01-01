import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedsTableComponent } from './breeds-table.component';

describe('BreedsTableComponent', () => {
  let component: BreedsTableComponent;
  let fixture: ComponentFixture<BreedsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedsTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
