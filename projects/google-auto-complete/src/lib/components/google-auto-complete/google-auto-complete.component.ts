import { Component, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from '../../interfaces/address';
import { IGoogleAddressComponents } from '../../interfaces/google-address-change.interface';
import { Options } from '../../interfaces/options/options';
import { AUTO_COMPLETE_TYPE } from '../../types/autocomplete.type';

@Component({
  selector: 'ngx-google-auto-complete',
  templateUrl: './google-auto-complete.component.html',
  styleUrls: ['./google-auto-complete.component.scss']
})
export class GoogleAutoCompleteComponent {

  @ViewChild('placesRef')
  public placesRef: GooglePlaceDirective;
  @Output()
  public onPlaceSelect: EventEmitter<Address | IGoogleAddressComponents[]> = new EventEmitter();
  @Input()
  public textboxValue: string = '';
  @Input()
  public autoCompleteType: AUTO_COMPLETE_TYPE = 'ADDRESS';
  @Input()
  public placeHolder: string = 'Enter a location';

  @Input() options: Options = {
    types: ['(cities)'],
  };

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
