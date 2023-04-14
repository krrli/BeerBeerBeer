import { Component } from '@angular/core';

@Component({
  selector: 'beer-search',
  templateUrl: './beer-search.component.html',
  styleUrls: ['./beer-search.component.scss'],
})
export class BeerSearchComponent {
  searchTerm = "";

  onKeydown($event: Event) {
    console.log('key down');
  }
  onKeyup($event: Event) {
    console.log('key up');
  }
  onEnter($event: Event) {
    console.log('enter');
  }

  search(term: string): void {
    this.searchTerm = term;
  }
}
