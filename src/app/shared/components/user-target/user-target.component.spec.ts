import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTargetComponent } from './user-target.component';

describe('UserTargetComponent', () => {
  let component: UserTargetComponent;
  let fixture: ComponentFixture<UserTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
