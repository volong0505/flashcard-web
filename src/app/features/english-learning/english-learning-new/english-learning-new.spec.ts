import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishLearningNew } from './english-learning-new';

describe('EnglishLearningNew', () => {
  let component: EnglishLearningNew;
  let fixture: ComponentFixture<EnglishLearningNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishLearningNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishLearningNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
