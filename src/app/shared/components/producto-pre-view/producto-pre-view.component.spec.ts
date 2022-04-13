import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPreViewComponent } from './producto-pre-view.component';

describe('ProductoPreViewComponent', () => {
  let component: ProductoPreViewComponent;
  let fixture: ComponentFixture<ProductoPreViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoPreViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoPreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
