import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookContentFunctionsComponent } from './book-content-functions.component';

describe('BookContentFunctionsComponent', () => {
  let component: BookContentFunctionsComponent;
  let fixture: ComponentFixture<BookContentFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookContentFunctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookContentFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
