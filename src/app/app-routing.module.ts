import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppRoutes} from './services/routing.service';
import RedirectComponent from './components/redirect/redirect.component';
import {IsSmartphoneGuard} from './modules/smartphone/guards/is-smartphone.guard';
import {IsNotSmartphoneGuard} from './modules/web/guards/is-not-smartphone.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RedirectComponent
  },
  {
    path: AppRoutes.mobile,
    loadChildren: () => import ('./modules/smartphone/smartphone.module').then (m => m.SmartphoneModule),
    canActivate: [IsSmartphoneGuard]
  },
  {
    path: AppRoutes.webBase,
    loadChildren: () => import ('./modules/web/web.module').then (m => m.WebModule),
    canActivate: [IsNotSmartphoneGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
