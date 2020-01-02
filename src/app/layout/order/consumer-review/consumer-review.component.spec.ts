import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerReviewComponent } from './consumer-review.component';

describe('ConsumerReviewComponent', () => {
  let component: ConsumerReviewComponent;
  let fixture: ComponentFixture<ConsumerReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
