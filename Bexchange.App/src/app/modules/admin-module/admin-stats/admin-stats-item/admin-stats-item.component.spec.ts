import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatsItemComponent } from './admin-stats-item.component';

describe('AdminStatsItemComponent', () => {
  let component: AdminStatsItemComponent;
  let fixture: ComponentFixture<AdminStatsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStatsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStatsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
