import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IBeer } from './types';


@Injectable({
  providedIn: 'root',
})
export class BeerService {
  private APIPath: string = 'https://api.punkapi.com/v2/beers';
  private maxPerPage: number = 36;


  constructor(private http: HttpClient) {

  }

  GetAllBeers(page: number = 1) : Observable<IBeer[]> {
    return this.http
      .get<IBeer[]>(`${this.APIPath}?page=${page}&per_page=${this.maxPerPage}`)
      .pipe(retry(1), catchError(this.errorHandl))
  }

  GetBeersByName(name: string, page: number = 1) : Observable<IBeer[]> {
    return this.http
      .get<IBeer[]>(`${this.APIPath}?page=${page}&per_page=${this.maxPerPage}&beer_name=${name}`)
      .pipe(retry(1), catchError(this.errorHandl))
  }

  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
