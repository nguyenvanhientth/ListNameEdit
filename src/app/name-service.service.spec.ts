import { TestBed } from '@angular/core/testing';

import { NameServiceService } from './name-service.service';

describe('NameServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NameServiceService = TestBed.get(NameServiceService);
    expect(service).toBeTruthy();
  });
});
