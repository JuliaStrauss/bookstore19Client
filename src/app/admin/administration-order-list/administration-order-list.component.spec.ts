import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationOrderListComponent } from './administration-order-list.component';

describe('AdministrationOrderListComponent', () => {
  let component: AdministrationOrderListComponent;
  let fixture: ComponentFixture<AdministrationOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
