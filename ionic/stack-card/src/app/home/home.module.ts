/** @format */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicSwipeAllModule } from 'ionic-swipe-all';

import { HomePage } from './home.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		IonicSwipeAllModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomePage,
			},
		]),
	],
	declarations: [HomePage],
})
export class HomePageModule {}
