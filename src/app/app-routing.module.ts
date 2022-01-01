import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'demo',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DemoComponent,
      },
      {
        path: '**',
        redirectTo: 'demo',
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'demo',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
