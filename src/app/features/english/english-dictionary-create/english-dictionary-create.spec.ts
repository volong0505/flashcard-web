import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishDictionaryCreate } from './english-dictionary-create';

describe('EnglishDictionaryCreate', () => {
  let component: EnglishDictionaryCreate;
  let fixture: ComponentFixture<EnglishDictionaryCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishDictionaryCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishDictionaryCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
