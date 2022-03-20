import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LaptopComponent } from './laptop.component';

const routes: Routes = [
  {
    path: '',
    component: LaptopComponent,
  },
];

@NgModule({
  declarations: [LaptopComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class LaptopModule { }
