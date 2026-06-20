import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishStructureList } from './english-structure-list';

describe('EnglishStructureList', () => {
  let component: EnglishStructureList;
  let fixture: ComponentFixture<EnglishStructureList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishStructureList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishStructureList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
