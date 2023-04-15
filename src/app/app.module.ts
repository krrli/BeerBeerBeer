import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BeerSearchComponent } from './beer-search/beer-search.component';
import { BeerSearchResultsComponent } from './beer-search-results/beer-search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    BeerSearchComponent,
    BeerSearchResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
