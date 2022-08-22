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
    loadChildren: () => import ('./common/common.module').then (m => m.CommonModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
