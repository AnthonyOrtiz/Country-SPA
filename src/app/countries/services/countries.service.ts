import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-stroe.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  public cacheStore:CacheStore = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {region: '', countries: []}
  };

  constructor(private http: HttpClient) { }

  private getCountryReuqest(url:string):Observable<Country[]>{

    return this.http.get<Country[]>(url)
      .pipe(
        catchError ( () => of([]) ),
      );
  }


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
    return this.getCountryReuqest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term , countries} )
      );
  }

  public searchCountry(term:string):Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountryReuqest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountries = {term, countries} )
      );
  }

  public searchRegion(region:Region):Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;

    return this.getCountryReuqest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = {region, countries})
      );
  }
}
