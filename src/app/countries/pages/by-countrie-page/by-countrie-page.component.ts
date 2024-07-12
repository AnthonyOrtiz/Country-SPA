import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-countrie-page',
  templateUrl: './by-countrie-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries:Country[] = [];

  constructor(private countiresService:CountriesService){}

  public searchByCountry(term:string){
    this.countiresService.searchCountry(term)
      .subscribe(countries => {
        this.countries = countries;
      });
  }

}
