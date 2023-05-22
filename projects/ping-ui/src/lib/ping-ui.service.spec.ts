import { TestBed } from '@angular/core/testing';

import { PingUiService } from './ping-ui.service';

describe('PingUiService', () => {
  let service: PingUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PingUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
