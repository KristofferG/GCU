import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBikeComponent } from './status-bike.component';

describe('StatusBikeComponent', () => {
  let component: StatusBikeComponent;
  let fixture: ComponentFixture<StatusBikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusBikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
