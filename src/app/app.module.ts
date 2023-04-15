import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BeerSearchComponent } from './beer-search/beer-search.component';
import { HttpClientModule } from '@angular/common/http';
import { BeerService } from './utils/beer-service.service';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BeerSearchComponent,
    BeerDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [BeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
