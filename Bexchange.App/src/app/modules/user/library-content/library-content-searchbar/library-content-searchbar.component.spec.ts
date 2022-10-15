import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryContentSearchbarComponent } from './library-content-searchbar.component';

describe('LibraryContentSearchbarComponent', () => {
  let component: LibraryContentSearchbarComponent;
  let fixture: ComponentFixture<LibraryContentSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryContentSearchbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryContentSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
