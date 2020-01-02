import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderSigninComponent } from './serviceprovider-signin.component';

describe('ServiceproviderSigninComponent', () => {
  let component: ServiceproviderSigninComponent;
  let fixture: ComponentFixture<ServiceproviderSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
