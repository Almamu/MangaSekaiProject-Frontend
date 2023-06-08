import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../core/components.module';
import {NgModule} from '@angular/core';
import {BaseComponent} from './views/base/base.component';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from '../../services/routing.service';
import {IsNotSmartphoneGuard} from './guards/is-not-smartphone.guard';
import {AuthenticationGuard} from '../authentication/guards/authentication-guard.service';
import {routes as AuthRoutes} from '../authentication/authentication.module';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [IsNotSmartphoneGuard, AuthenticationGuard],
    children: [
      {
        path: AppRoutes.home,
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: AppRoutes.settings,
        loadChildren: () => import ('../settings/settings.module').then (m => m.SettingsPageModule)
      },
    ]
  },
  {
    path: AppRoutes.auth,
    children: AuthRoutes
  },
];

@NgModule ({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  exports: [BaseComponent],
  declarations: [BaseComponent]
})
export class WebModule { }
