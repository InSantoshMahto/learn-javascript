import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MobileComponent } from './mobile.component';

const routes: Routes = [
  {
    path: '',
    component: MobileComponent,
  },
];

@NgModule({
  declarations: [MobileComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class MobileModule { }
