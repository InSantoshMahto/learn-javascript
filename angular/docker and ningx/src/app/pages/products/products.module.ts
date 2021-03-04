import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: 'mobile',
    loadChildren: () =>
      import('../mobile/mobile.module').then((m) => m.MobileModule),
  },
  {
    path: 'laptop',
    loadChildren: () =>
      import('../laptop/laptop.module').then((m) => m.LaptopModule),
  },
  {
    path: '',
    pathMatch: 'full',
    component: ProductsComponent,
  },
];

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProductsModule {}
