import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectDialogWithMsgComponent } from './reject-dialog-with-msg.component';

describe('RejectDialogWithMsgComponent', () => {
  let component: RejectDialogWithMsgComponent;
  let fixture: ComponentFixture<RejectDialogWithMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectDialogWithMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectDialogWithMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
