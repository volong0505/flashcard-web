import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishStructureCreate } from './english-structure-create';

describe('EnglishStructureCreate', () => {
  let component: EnglishStructureCreate;
  let fixture: ComponentFixture<EnglishStructureCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishStructureCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishStructureCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
