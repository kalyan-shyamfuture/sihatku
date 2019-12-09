import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SproviderregComponent } from './sproviderreg.component';

describe('SproviderregComponent', () => {
  let component: SproviderregComponent;
  let fixture: ComponentFixture<SproviderregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SproviderregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SproviderregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
