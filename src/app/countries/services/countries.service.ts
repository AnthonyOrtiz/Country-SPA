import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl:string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  public searchCountryByAlphaCode(code:string):Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }


  public searchByCapital(term:string):Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  public searchCountry(term:string):Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url).
      pipe(
        catchError(() => of([]))
      );
  }

  public searchRegion(term:string):Observable<Country[]>{
    const url = `${this.apiUrl}/region/${term}`;

    return this.http.get<Country[]>(url).
      pipe(
        catchError(() => of([]))
      )
  }
}
