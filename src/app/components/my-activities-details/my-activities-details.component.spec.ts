import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyActivitiesDetailsComponent } from './my-activities-details.component';

describe('MyActivitiesDetailsComponent', () => {
  let component: MyActivitiesDetailsComponent;
  let fixture: ComponentFixture<MyActivitiesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyActivitiesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyActivitiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
