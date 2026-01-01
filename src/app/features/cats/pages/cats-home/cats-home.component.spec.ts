import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsHomeComponent } from './cats-home.component';

describe('CatsHomeComponent', () => {
  let component: CatsHomeComponent;
  let fixture: ComponentFixture<CatsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatsHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
