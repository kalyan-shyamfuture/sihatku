import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProceduresAddComponent } from './my-procedures-add.component';

describe('MyProceduresAddComponent', () => {
  let component: MyProceduresAddComponent;
  let fixture: ComponentFixture<MyProceduresAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProceduresAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProceduresAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
