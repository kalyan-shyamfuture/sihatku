import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesidebarComponent } from './servicesidebar.component';

describe('ServicesidebarComponent', () => {
  let component: ServicesidebarComponent;
  let fixture: ComponentFixture<ServicesidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
