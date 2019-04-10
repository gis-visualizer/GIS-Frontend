import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetgeoComponent } from './getgeo.component';

describe('GetgeoComponent', () => {
  let component: GetgeoComponent;
  let fixture: ComponentFixture<GetgeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetgeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetgeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
