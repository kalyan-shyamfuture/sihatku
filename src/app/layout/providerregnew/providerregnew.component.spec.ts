import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderregnewComponent } from './providerregnew.component';

describe('ProviderregnewComponent', () => {
  let component: ProviderregnewComponent;
  let fixture: ComponentFixture<ProviderregnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderregnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderregnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
