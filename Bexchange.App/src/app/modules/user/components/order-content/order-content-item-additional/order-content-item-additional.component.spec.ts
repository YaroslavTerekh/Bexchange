import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderContentItemAdditionalComponent } from './order-content-item-additional.component';

describe('OrderContentItemAdditionalComponent', () => {
  let component: OrderContentItemAdditionalComponent;
  let fixture: ComponentFixture<OrderContentItemAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderContentItemAdditionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderContentItemAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
