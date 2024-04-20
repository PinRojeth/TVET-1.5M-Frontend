import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResourceInfoComponent } from './human-resource-info.component';

describe('HumanResourceInfoComponent', () => {
  let component: HumanResourceInfoComponent;
  let fixture: ComponentFixture<HumanResourceInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HumanResourceInfoComponent]
    });
    fixture = TestBed.createComponent(HumanResourceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
