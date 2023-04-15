import { Component } from '@angular/core';
import { IBeer } from '../utils/types';
import { BeerService } from '../utils/beer-service.service';

@Component({
  selector: 'beer-search',
  templateUrl: './beer-search.component.html',
  styleUrls: ['./beer-search.component.scss'],
})
export class BeerSearchComponent {
  searchTerm = '';
  resListIsOpen = false;
  activeBeer$?: IBeer;
  activeIndex: number = 0;
  beers$: IBeer[] = [
    { id: 0, name: 'dummy beer', image_url: '', description: 'very nice' },
  ];

  constructor(public beerService: BeerService) {
    this.loadBeers();
  }

  loadBeers() {
    return this.beerService.GetAllBeers().subscribe((data: IBeer[]) => {
      this.beers$ = data;
    });
  }

  onKeydown($event: Event) {
    if (this.activeIndex < this.beers$.length - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0;
    }
    this.activeBeer$ = this.beers$[this.activeIndex];
  }
  onKeyup($event: Event) {

    if (this.activeIndex === 0) {
      this.activeIndex = this.beers$.length - 1;
    } else {
      this.activeIndex--;
    }
    this.activeBeer$ = this.beers$[this.activeIndex];
  }
  onEnter($event: Event) {
    this.activeBeer$ = this.beers$[this.activeIndex];
    this.searchTerm = this.activeBeer$.name;
    this.resListIsOpen = false;
  }

  onClickSelectBeer(beer: IBeer) {
    this.activeBeer$ = beer;
    this.searchTerm = beer.name;
    this.resListIsOpen = false;
  }


  search(term: string): void {
    this.searchTerm = term;
    this.activeBeer$ = this.beers$[this.activeIndex];
    this.resListIsOpen = true;
  }

}
