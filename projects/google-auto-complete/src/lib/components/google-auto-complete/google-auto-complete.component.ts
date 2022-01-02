import { Component, Output, ViewChild, EventEmitter, Input, ElementRef, AfterViewInit } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from '../../interfaces/address';
import { IAttribute } from '../../interfaces/attribute.interface';
import { IGoogleAddressComponents } from '../../interfaces/google-address-change.interface';
import { Options } from '../../interfaces/options/options';
import { AUTO_COMPLETE_TYPE } from '../../types/autocomplete.type';

@Component({
  selector: 'ngx-google-auto-complete',
  templateUrl: './google-auto-complete.component.html',
  styleUrls: ['./google-auto-complete.component.scss']
})
export class GoogleAutoCompleteComponent implements AfterViewInit {

  private _attributeData: IAttribute[] = [];
  private _cssClass: string = '';

  @ViewChild('Inputbox')
  public Inputbox: ElementRef<any>;

  @ViewChild('placesRef')
  public placesRef: GooglePlaceDirective;

  @Output()
  public onPlaceSelect: EventEmitter<Address | IGoogleAddressComponents[]> = new EventEmitter();

  @Output()
  public onInputInitialized: EventEmitter<ElementRef> = new EventEmitter();

  @Input()
  public textboxValue: string = '';

  @Input()
  public autoCompleteType: AUTO_COMPLETE_TYPE = 'ADDRESS';

  @Input()
  public placeHolder: string = 'Enter a location';

  @Input() public options: Options = {
    types: ['(cities)'],
  };

  @Input() public set attributes(data: IAttribute[]) {
    this._attributeData = data;
    this.setAttributes(data);
  }

  @Input() public set cssClass(cls: string) {
    this._cssClass = cls;
  }

  public get cssClass(): string {
    return this._cssClass;
  }

  public ngAfterViewInit(): void {
    this.setAttributes(this._attributeData);
    this.afterInputInitialized();
  }

  public afterInputInitialized(): void {
    if (this.Inputbox) {
      this.onInputInitialized.emit(this.Inputbox);
    }
  }

  private setAttributes(data: IAttribute[]): void {
    if (this.Inputbox && this.Inputbox.nativeElement) {
      const element: HTMLElement = this.Inputbox.nativeElement;
      for (const d of data) {
        element.setAttribute(d.name, d.value);
      }
    }
  }

  public get settings(): any {
    return this.options;
  }

  public onAddressChange(event: Address): void {
    switch (this.autoCompleteType) {
      case 'ADDRESS':
      case 'COMPLETE_ADDRESS':
        this.textboxValue = '';
        const countryAndCity: IGoogleAddressComponents[] = event.address_components.filter(
          (address: IGoogleAddressComponents) => {
            return address.types.includes('country') || address.types.includes('locality');
          },
        );
        countryAndCity.forEach((cn: IGoogleAddressComponents) => {
          if (this.textboxValue === '') {
            this.textboxValue += cn.long_name;
          }
          else {
            this.textboxValue += ', ' + cn.long_name;
          }
          cn.geometry = event.geometry;
        });
        if (this.autoCompleteType === 'ADDRESS') {
          this.onPlaceSelect.emit(countryAndCity);
        } else {
          this.onPlaceSelect.emit(event);
        }
        break;
      case 'BUSINESS':
        this.textboxValue = event.name;
        this.onPlaceSelect.emit(event);
        break;
      default:
        break;
    }
  }

}
