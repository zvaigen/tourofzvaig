import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriestableComponent } from './countriestable.component';

describe('CountriestableComponent', () => {
  let component: CountriestableComponent;
  let fixture: ComponentFixture<CountriestableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriestableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriestableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
