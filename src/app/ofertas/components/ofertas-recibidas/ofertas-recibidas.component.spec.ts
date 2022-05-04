import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasRecibidasComponent } from './ofertas-recibidas.component';

describe('OfertasRecibidasComponent', () => {
  let component: OfertasRecibidasComponent;
  let fixture: ComponentFixture<OfertasRecibidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertasRecibidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasRecibidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
