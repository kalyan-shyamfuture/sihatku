import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProceduresComponent } from './my-procedures.component';

describe('MyProceduresComponent', () => {
  let component: MyProceduresComponent;
  let fixture: ComponentFixture<MyProceduresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProceduresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
