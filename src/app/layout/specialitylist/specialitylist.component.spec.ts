import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitylistComponent } from './specialitylist.component';

describe('SpecialitylistComponent', () => {
  let component: SpecialitylistComponent;
  let fixture: ComponentFixture<SpecialitylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialitylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialitylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
