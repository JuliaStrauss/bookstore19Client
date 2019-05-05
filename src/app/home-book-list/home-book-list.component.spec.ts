import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBookListComponent } from './home-book-list.component';

describe('HomeBookListComponent', () => {
  let component: HomeBookListComponent;
  let fixture: ComponentFixture<HomeBookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
