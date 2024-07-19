import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public countries:Country[] = [];
  public regions:Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectRegion?: Region;

  constructor(private countryService:CountriesService){}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectRegion = this.countryService.cacheStore.byRegion.region;
  }

  public searchByRegion(region:Region):void{
    this.selectRegion = region;

    this.countryService.searchRegion(region).
    subscribe(countries => {
      this.countries = countries;
    })
  }

}
