import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupacionEditarComponent } from './agrupacion-editar.component';

describe('AgrupacionEditarComponent', () => {
  let component: AgrupacionEditarComponent;
  let fixture: ComponentFixture<AgrupacionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrupacionEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrupacionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
