import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingUiComponent } from './ping-ui.component';

describe('PingUiComponent', () => {
  let component: PingUiComponent;
  let fixture: ComponentFixture<PingUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PingUiComponent]
    });
    fixture = TestBed.createComponent(PingUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
