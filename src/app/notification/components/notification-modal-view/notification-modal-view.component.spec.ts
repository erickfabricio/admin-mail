import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationModalViewComponent } from './notification-modal-view.component';

describe('NotificationModalViewComponent', () => {
  let component: NotificationModalViewComponent;
  let fixture: ComponentFixture<NotificationModalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
