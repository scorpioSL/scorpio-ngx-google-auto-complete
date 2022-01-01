import { Component, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Address, AUTO_COMPLETE_TYPE, IGoogleAddressComponents, Options } from 'projects/google-auto-complete/src/lib';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  public editorOptions: JsonEditorOptions;
  public data: any;

  public settings1: Options = {
    types: ['(cities)'],
  };

  public settings2: Options = {
    componentRestrictions: { country: 'lk' }, //limit response for a specific country
  }

  public initialTextBoxValue: string = 'This is initial text';
  public placeHolder: string = 'This is place holder';
  public autoCompleteType1: AUTO_COMPLETE_TYPE = 'ADDRESS';
  public autoCompleteType2: AUTO_COMPLETE_TYPE = 'BUSINESS';
  public autoCompleteType3: AUTO_COMPLETE_TYPE = 'COMPLETE_ADDRESS';

  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  constructor() {
    this.initializeJsonEditor();
  }

  private initializeJsonEditor(): void {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    this.editorOptions.mode = 'code'; //set only one mode
    this.data = {};
  }

  public onDataChange(data: Address | IGoogleAddressComponents[]) {
    this.data = data;
  }
}
