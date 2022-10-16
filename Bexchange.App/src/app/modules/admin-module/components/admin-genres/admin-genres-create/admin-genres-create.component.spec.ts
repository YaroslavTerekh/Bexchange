import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenresCreateComponent } from './admin-genres-create.component';

describe('AdminGenresCreateComponent', () => {
  let component: AdminGenresCreateComponent;
  let fixture: ComponentFixture<AdminGenresCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGenresCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGenresCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
