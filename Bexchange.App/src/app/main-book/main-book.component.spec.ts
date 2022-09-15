import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBookComponent } from './main-book.component';

describe('MainBookComponent', () => {
  let component: MainBookComponent;
  let fixture: ComponentFixture<MainBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
