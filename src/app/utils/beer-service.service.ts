import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IBeer } from './types';


@Injectable({
  providedIn: 'root',
})
export class BeerService {
  //private beers = new BehaviorSubject<IBeer[]>(null);
  //beers$: Observable<IBeer[]> = this.beers.asObservable();
  private APIPath: string = 'https://api.punkapi.com/v2/beers';
  private maxPerLoad = 12;
  private apiString: any;
  private maxPerPage: number = 36;


  constructor(private http: HttpClient) {
    //this.GetAllBeers();
  }

  // GET
  // All beers set to apiString
  GetAllBeers(page: number = 1) : Observable<IBeer[]> {
    return this.http
      .get<IBeer[]>(`${this.APIPath}?page=${page}&per_page=${this.maxPerPage}`)
      .pipe(retry(1), catchError(this.errorHandl))
  }

  GetBeerByName(page: number = 1, name: string) : Observable<IBeer[]> {
    return this.http
      .get<IBeer[]>(`${this.APIPath}?page=${page}&per_page=${this.maxPerPage}`)
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
