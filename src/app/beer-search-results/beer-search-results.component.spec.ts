import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerSearchResultsComponent } from './beer-search-results.component';

describe('BeerSearchResultsComponent', () => {
  let component: BeerSearchResultsComponent;
  let fixture: ComponentFixture<BeerSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerSearchResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
