import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  public placeholder:string = "";

  @Output()
  public txtSearchEmit:EventEmitter<string> = new EventEmitter();

  @ViewChild('txtSearchInput')
  public txtSeacrhInput!:ElementRef<HTMLInputElement>

  public getTxtSearchInput():void{
    const txtSearch:string = this.txtSeacrhInput.nativeElement.value;
    this.txtSearchEmit.emit(txtSearch);
  }



}
