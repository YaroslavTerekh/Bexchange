import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookContentOwnerFunctionsComponent } from './book-content-owner-functions.component';

describe('BookContentOwnerFunctionsComponent', () => {
  let component: BookContentOwnerFunctionsComponent;
  let fixture: ComponentFixture<BookContentOwnerFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookContentOwnerFunctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookContentOwnerFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
