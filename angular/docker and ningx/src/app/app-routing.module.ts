import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
