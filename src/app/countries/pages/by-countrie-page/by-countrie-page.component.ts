import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-countrie-page',
  templateUrl: './by-countrie-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public countries:Country[] = [];
  public initialValue:string = '';

  constructor(private countiresService:CountriesService){}

  ngOnInit(): void {
    this.countries = this.countiresService.cacheStore.byCountries.countries;
    this.initialValue = this.countiresService.cacheStore.byCountries.term;
  }

  public searchByCountry(term:string){
    this.countiresService.searchCountry(term)
      .subscribe(countries => {
        this.countries = countries;
      });
  }

}
