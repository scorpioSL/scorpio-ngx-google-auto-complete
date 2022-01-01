import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GoogleAutoCompleteComponent } from './components/google-auto-complete/google-auto-complete.component';



@NgModule({
  declarations: [GoogleAutoCompleteComponent],
  imports: [
    FormsModule,
    GooglePlaceModule,
    NbInputModule,
  ],
  exports: [GoogleAutoCompleteComponent]
})
export class GoogleAutoCompleteModule { }
