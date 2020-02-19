import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProceduresEditComponent } from './my-procedures-edit.component';

describe('MyProceduresEditComponent', () => {
  let component: MyProceduresEditComponent;
  let fixture: ComponentFixture<MyProceduresEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProceduresEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProceduresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
