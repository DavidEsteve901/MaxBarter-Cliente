import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeNotFoundComponent } from './mensaje-not-found.component';

describe('MensajeNotFoundComponent', () => {
  let component: MensajeNotFoundComponent;
  let fixture: ComponentFixture<MensajeNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
