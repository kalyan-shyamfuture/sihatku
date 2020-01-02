import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSihatkuComponent } from './explore-sihatku.component';

describe('ExploreSihatkuComponent', () => {
  let component: ExploreSihatkuComponent;
  let fixture: ComponentFixture<ExploreSihatkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreSihatkuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreSihatkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
