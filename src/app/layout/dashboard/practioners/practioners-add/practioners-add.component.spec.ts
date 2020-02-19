import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractionersAddComponent } from './practioners-add.component';

describe('PractionersAddComponent', () => {
  let component: PractionersAddComponent;
  let fixture: ComponentFixture<PractionersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractionersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractionersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
