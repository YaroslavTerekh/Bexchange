import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsModalItemComponent } from './comments-modal-item.component';

describe('CommentsModalItemComponent', () => {
  let component: CommentsModalItemComponent;
  let fixture: ComponentFixture<CommentsModalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsModalItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsModalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
