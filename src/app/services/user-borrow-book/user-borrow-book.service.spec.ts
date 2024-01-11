import { TestBed } from '@angular/core/testing';

import { UserBorrowBookService } from './user-borrow-book.service';

describe('UserBorrowBookService', () => {
  let service: UserBorrowBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBorrowBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
