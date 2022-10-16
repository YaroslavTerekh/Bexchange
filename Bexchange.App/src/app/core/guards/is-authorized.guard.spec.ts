import { TestBed } from '@angular/core/testing';

import { IsAuthorizedGuard } from './is-authorized.guard';

describe('IsAuthorizedGuard', () => {
  let guard: IsAuthorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAuthorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
