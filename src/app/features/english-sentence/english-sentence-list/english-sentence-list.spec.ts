import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishSentenceList } from './english-sentence-list';

describe('EnglishSentenceList', () => {
  let component: EnglishSentenceList;
  let fixture: ComponentFixture<EnglishSentenceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishSentenceList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishSentenceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
