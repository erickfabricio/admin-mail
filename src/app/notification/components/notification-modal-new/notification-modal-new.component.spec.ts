import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationModalNewComponent } from './notification-modal-new.component';

describe('NotificationModalNewComponent', () => {
  let component: NotificationModalNewComponent;
  let fixture: ComponentFixture<NotificationModalNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationModalNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationModalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
