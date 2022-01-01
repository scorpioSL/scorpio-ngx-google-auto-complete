import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public menuItems: NbMenuItem[] = [{
    title: 'Demo',
    icon: 'google-outline',
    url: '/demo',
  }];

  constructor() { }
}
