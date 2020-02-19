import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOdersComponent } from './new-oders.component';

describe('NewOdersComponent', () => {
  let component: NewOdersComponent;
  let fixture: ComponentFixture<NewOdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
