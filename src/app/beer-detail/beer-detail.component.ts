import { Component, Input } from '@angular/core';
import { IBeer } from '../utils/types';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent {
  @Input()
  beer$?: IBeer;

}
