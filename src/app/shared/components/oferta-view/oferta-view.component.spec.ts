import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaViewComponent } from './oferta-view.component';

describe('OfertaViewComponent', () => {
  let component: OfertaViewComponent;
  let fixture: ComponentFixture<OfertaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
