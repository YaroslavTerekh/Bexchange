import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsContentComponent } from './authors-content.component';

describe('AuthorsContentComponent', () => {
  let component: AuthorsContentComponent;
  let fixture: ComponentFixture<AuthorsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
