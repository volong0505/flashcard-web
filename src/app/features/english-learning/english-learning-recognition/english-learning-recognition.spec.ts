import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishLearningRecognition } from './english-learning-recognition';

describe('EnglishLearningRecognition', () => {
  let component: EnglishLearningRecognition;
  let fixture: ComponentFixture<EnglishLearningRecognition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishLearningRecognition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishLearningRecognition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
