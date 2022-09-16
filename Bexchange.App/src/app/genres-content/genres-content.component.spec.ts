import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresContentComponent } from './genres-content.component';

describe('GenresContentComponent', () => {
  let component: GenresContentComponent;
  let fixture: ComponentFixture<GenresContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenresContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenresContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
