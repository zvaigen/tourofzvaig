import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteroidInfoModelComponent } from './asteroid-info-model.component';

describe('AsteroidInfoModelComponent', () => {
  let component: AsteroidInfoModelComponent;
  let fixture: ComponentFixture<AsteroidInfoModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsteroidInfoModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsteroidInfoModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
