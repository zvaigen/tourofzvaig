import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistoryModelComponent } from './search-history-model.component';

describe('SearchHistoryModelComponent', () => {
  let component: SearchHistoryModelComponent;
  let fixture: ComponentFixture<SearchHistoryModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHistoryModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHistoryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
