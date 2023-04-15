import { Component, Input, Output } from '@angular/core';
import { Beer } from '../utils/types';


@Component({
  selector: 'app-beer-search-results',
  templateUrl: './beer-search-results.component.html',
  styleUrls: ['./beer-search-results.component.scss']
})

export class BeerSearchResultsComponent {
  @Input()
  searchTerm!: string;
  @Input()  @Output()
  activeBeer$?: Beer;
  @Input()  @Output()
  activeIndex: number = 0;
  @Input()
  beers$!: Array<Beer>;

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

onClickSelectBeerByIndex(index: number){
  this.activeBeer$ = this.beers$[index];
  this.activeIndex = index;
  this.searchTerm = this.beers$[index].name;
  console.log("selected a new beer via click ", this.activeBeer$.name);

}

onClickSelectBeer(beer: Beer){
  this.activeBeer$ = beer;
  this.searchTerm = beer.name
  console.log("selected a new beer via click ", beer.name);

}



}
