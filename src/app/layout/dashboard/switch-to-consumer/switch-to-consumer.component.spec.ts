import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchToConsumerComponent } from './switch-to-consumer.component';

describe('SwitchToConsumerComponent', () => {
  let component: SwitchToConsumerComponent;
  let fixture: ComponentFixture<SwitchToConsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchToConsumerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchToConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
