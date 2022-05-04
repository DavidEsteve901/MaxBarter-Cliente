import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasEnviadasComponent } from './ofertas-enviadas.component';

describe('OfertasEnviadasComponent', () => {
  let component: OfertasEnviadasComponent;
  let fixture: ComponentFixture<OfertasEnviadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertasEnviadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasEnviadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
