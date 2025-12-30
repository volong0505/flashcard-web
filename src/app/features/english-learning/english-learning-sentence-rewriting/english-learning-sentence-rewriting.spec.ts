import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishLearningSentenceRewriting } from './english-learning-sentence-rewriting';

describe('EnglishLearningSentenceRewriting', () => {
  let component: EnglishLearningSentenceRewriting;
  let fixture: ComponentFixture<EnglishLearningSentenceRewriting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishLearningSentenceRewriting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishLearningSentenceRewriting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
