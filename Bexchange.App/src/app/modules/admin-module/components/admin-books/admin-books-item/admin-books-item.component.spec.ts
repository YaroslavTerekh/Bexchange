import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBooksItemComponent } from './admin-books-item.component';

describe('AdminBooksItemComponent', () => {
  let component: AdminBooksItemComponent;
  let fixture: ComponentFixture<AdminBooksItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBooksItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBooksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
