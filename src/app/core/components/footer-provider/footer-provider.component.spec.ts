import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterProviderComponent } from './footer-provider.component';

describe('FooterProviderComponent', () => {
  let component: FooterProviderComponent;
  let fixture: ComponentFixture<FooterProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
