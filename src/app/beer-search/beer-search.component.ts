import { Component } from '@angular/core';
import { Beer } from '../utils/types';

@Component({
  selector: 'beer-search',
  templateUrl: './beer-search.component.html',
  styleUrls: ['./beer-search.component.scss'],
})
export class BeerSearchComponent {
  searchTerm = '';
  beers$: Array<Beer> = new Array(
    { id: 0, name: 'hoi'},
    { id: 1, name: 'hoi 2'},
    { id: 2, name: 'blubbsi'}
  );
  activeBeer$?: Beer;
  activeIndex: number = 0;

  onKeydown($event: Event) {
    if(this.activeIndex < this.beers$.length-1){
      this.activeIndex++;
    }
    else{
      this.activeIndex = 0;
    }
    this.activeBeer$ = this.beers$[this.activeIndex];
  }
  onKeyup($event: Event) {
    if(this.activeIndex === 0){
      this.activeIndex = this.beers$.length-1;
    }else{
      this.activeIndex--;
    }
    this.activeBeer$ = this.beers$[this.activeIndex];
  }
  onEnter($event: Event) {
    this.activeBeer$ = this.beers$[this.activeIndex];
  }

  onClickSelectBeer(beer: Beer){
    this.activeBeer$ = beer;
  }

  search(term: string): void {
    this.searchTerm = term;
    this.activeBeer$ = this.beers$[this.activeIndex];
  }
}
