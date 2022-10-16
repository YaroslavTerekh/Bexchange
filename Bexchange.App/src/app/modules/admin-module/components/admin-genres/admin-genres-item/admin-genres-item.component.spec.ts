import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenresItemComponent } from './admin-genres-item.component';

describe('AdminGenresItemComponent', () => {
  let component: AdminGenresItemComponent;
  let fixture: ComponentFixture<AdminGenresItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGenresItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGenresItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
