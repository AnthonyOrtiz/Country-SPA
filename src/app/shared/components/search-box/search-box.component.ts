import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer:Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder:string = "";

  @Input()
  public initialValue:string = '';

  @Output()
  public txtSearchEmit:EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce:EventEmitter<string> = new EventEmitter();

  @ViewChild('txtSearchInput')
  public txtSeacrhInput!:ElementRef<HTMLInputElement>

  public ngOnInit():void{
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value => {
      this.onDebounce.emit(value)
    });
  }

  public ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  public getTxtSearchInput():void{
    const txtSearch:string = this.txtSeacrhInput.nativeElement.value;
    this.txtSearchEmit.emit(txtSearch);
  }

  public onkeyPress(searchTerm:string):void{
    this.debouncer.next(searchTerm);
  }

}
