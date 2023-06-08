import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppRoutes} from './services/routing.service';
import RedirectComponent from './components/redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RedirectComponent
  },
  {
    path: AppRoutes.mobile,
    loadChildren: () => import ('./modules/smartphone/smartphone.module').then (m => m.SmartphoneModule)
  },
  {
    path: AppRoutes.webBase,
    loadChildren: () => import ('./modules/web/web.module').then (m => m.WebModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
