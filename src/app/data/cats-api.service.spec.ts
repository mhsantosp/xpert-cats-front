import { TestBed } from '@angular/core/testing';

import { CatsApiservice } from './cats-api.service';

describe('CatsApiservice', () => {
  let service: CatsApiservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatsApiservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
