import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {
  public countries:Country[] = [];
  public initialValue:string = '';
  public isLoading:boolean = false;

  constructor(private countiresService:CountriesService){}

  ngOnInit(): void {
    this.countries = this.countiresService.cacheStore.byCapital.countries;
    this.initialValue = this.countiresService.cacheStore.byCapital.term;
  }

  public searchByCapital(term:string){
    this.isLoading = true;

    this.countiresService.searchByCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
