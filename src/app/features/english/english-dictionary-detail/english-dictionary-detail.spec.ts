import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishDictionaryDetail } from './english-dictionary-detail';

describe('EnglishDictionaryDetail', () => {
  let component: EnglishDictionaryDetail;
  let fixture: ComponentFixture<EnglishDictionaryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishDictionaryDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishDictionaryDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
