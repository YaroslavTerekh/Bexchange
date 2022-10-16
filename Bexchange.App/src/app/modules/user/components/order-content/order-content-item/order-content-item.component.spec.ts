import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderContentItemComponent } from './order-content-item.component';

describe('OrderContentItemComponent', () => {
  let component: OrderContentItemComponent;
  let fixture: ComponentFixture<OrderContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderContentItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
