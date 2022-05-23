import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilViewComponent } from './perfil-view.component';

describe('PerfilViewComponent', () => {
  let component: PerfilViewComponent;
  let fixture: ComponentFixture<PerfilViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
