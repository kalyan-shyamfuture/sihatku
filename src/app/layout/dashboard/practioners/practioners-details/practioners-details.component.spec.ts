import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractionersDetailsComponent } from './practioners-details.component';

describe('PractionersDetailsComponent', () => {
  let component: PractionersDetailsComponent;
  let fixture: ComponentFixture<PractionersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractionersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractionersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
