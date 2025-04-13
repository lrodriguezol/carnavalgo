import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupacionesListComponent } from './agrupaciones-list.component';

describe('AgrupacionesListComponent', () => {
  let component: AgrupacionesListComponent;
  let fixture: ComponentFixture<AgrupacionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrupacionesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrupacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
