import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationMainComponent } from './application-main.component';

describe('ApplicationMainComponent', () => {
  let component: ApplicationMainComponent;
  let fixture: ComponentFixture<ApplicationMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
