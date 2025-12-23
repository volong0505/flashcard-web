import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishSentenceCreate } from './english-sentence-create';

describe('EnglishSentenceCreate', () => {
  let component: EnglishSentenceCreate;
  let fixture: ComponentFixture<EnglishSentenceCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishSentenceCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishSentenceCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
