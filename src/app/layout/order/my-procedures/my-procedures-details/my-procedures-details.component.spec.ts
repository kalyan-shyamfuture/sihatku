import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProceduresDetailsComponent } from './my-procedures-details.component';

describe('MyProceduresDetailsComponent', () => {
  let component: MyProceduresDetailsComponent;
  let fixture: ComponentFixture<MyProceduresDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProceduresDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProceduresDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
