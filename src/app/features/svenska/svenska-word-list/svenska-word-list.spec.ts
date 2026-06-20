import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvenskaWordList } from './svenska-word-list';

describe('SvenskaWordList', () => {
  let component: SvenskaWordList;
  let fixture: ComponentFixture<SvenskaWordList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvenskaWordList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvenskaWordList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
