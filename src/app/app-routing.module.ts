import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {routes as AuthRoutes} from './authentication/authentication.module';
import {AppRoutes} from './services/routing.service';

const routes: Routes = [
  {
    path: AppRoutes.authBase,
    children: AuthRoutes
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.mobileHome
  },
  {
    path: AppRoutes.mobileBase,
    loadChildren: () => import ('./smartphone/smartphone.module').then (m => m.SmartphoneModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
