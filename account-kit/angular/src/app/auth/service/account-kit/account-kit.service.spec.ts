import { TestBed } from '@angular/core/testing';

import { AccountKitService } from './account-kit.service';

describe('AccountKitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountKitService = TestBed.get(AccountKitService);
    expect(service).toBeTruthy();
  });
});
