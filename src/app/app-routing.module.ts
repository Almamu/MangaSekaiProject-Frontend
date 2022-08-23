import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {routes as AuthRoutes} from './authentication/authentication.module';

const routes: Routes = [
  {
    path: 'auth',
    children: AuthRoutes
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'mobile/home'
  },
  {
    path: 'mobile',
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
