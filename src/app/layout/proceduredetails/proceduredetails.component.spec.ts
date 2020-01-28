import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduredetailsComponent } from './proceduredetails.component';

describe('ProceduredetailsComponent', () => {
  let component: ProceduredetailsComponent;
  let fixture: ComponentFixture<ProceduredetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceduredetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceduredetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
