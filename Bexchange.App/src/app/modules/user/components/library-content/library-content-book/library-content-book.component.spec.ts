import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryContentBookComponent } from './library-content-book.component';

describe('LibraryContentBookComponent', () => {
  let component: LibraryContentBookComponent;
  let fixture: ComponentFixture<LibraryContentBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryContentBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryContentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
