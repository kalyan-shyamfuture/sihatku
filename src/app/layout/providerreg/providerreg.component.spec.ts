import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderregComponent } from './providerreg.component';

describe('ProviderregComponent', () => {
  let component: ProviderregComponent;
  let fixture: ComponentFixture<ProviderregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
