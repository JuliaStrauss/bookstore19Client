import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationOrderDetailsComponent } from './administration-order-details.component';

describe('AdministrationOrderDetailsComponent', () => {
  let component: AdministrationOrderDetailsComponent;
  let fixture: ComponentFixture<AdministrationOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
