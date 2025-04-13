import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupacionDetalleComponent } from './agrupacion-detalle.component';

describe('AgrupacionDetalleComponent', () => {
  let component: AgrupacionDetalleComponent;
  let fixture: ComponentFixture<AgrupacionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrupacionDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrupacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
