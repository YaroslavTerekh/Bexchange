import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorsItemComponent } from './admin-authors-item.component';

describe('AdminAuthorsItemComponent', () => {
  let component: AdminAuthorsItemComponent;
  let fixture: ComponentFixture<AdminAuthorsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthorsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
