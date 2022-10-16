import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersItemComponent } from './admin-orders-item.component';

describe('AdminOrdersItemComponent', () => {
  let component: AdminOrdersItemComponent;
  let fixture: ComponentFixture<AdminOrdersItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrdersItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrdersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
