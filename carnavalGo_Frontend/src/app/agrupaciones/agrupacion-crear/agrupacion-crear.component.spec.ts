import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupacionCrearComponent } from './agrupacion-crear.component';

describe('AgrupacionCrearComponent', () => {
  let component: AgrupacionCrearComponent;
  let fixture: ComponentFixture<AgrupacionCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrupacionCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrupacionCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
