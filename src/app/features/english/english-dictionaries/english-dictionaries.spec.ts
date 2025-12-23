import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishDictionaries } from './english-dictionaries';

describe('EnglishDictionaries', () => {
  let component: EnglishDictionaries;
  let fixture: ComponentFixture<EnglishDictionaries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishDictionaries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishDictionaries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
