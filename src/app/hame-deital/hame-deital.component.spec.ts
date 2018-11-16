import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HameDeitalComponent } from './hame-deital.component';

describe('HameDeitalComponent', () => {
  let component: HameDeitalComponent;
  let fixture: ComponentFixture<HameDeitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HameDeitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HameDeitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
