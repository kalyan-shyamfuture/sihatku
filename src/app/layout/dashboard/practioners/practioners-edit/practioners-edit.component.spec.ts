import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractionersEditComponent } from './practioners-edit.component';

describe('PractionersEditComponent', () => {
  let component: PractionersEditComponent;
  let fixture: ComponentFixture<PractionersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractionersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractionersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
