import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarticonComponent } from './carticon.component';

describe('CarticonComponent', () => {
  let component: CarticonComponent;
  let fixture: ComponentFixture<CarticonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarticonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarticonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
