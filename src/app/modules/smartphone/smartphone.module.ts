import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../core/components.module';
import {NgModule} from '@angular/core';
import {BaseComponent} from './views/base/base.component';
import {RouterModule, Routes} from '@angular/router';
import {FirstRunComponent} from './views/first-run/first-run.component';
import {SmartphoneInitializedGuard} from './guards/smartphone-initialized.guard';
import {SmartphoneNotInitializedGuard} from './guards/smartphone-not-initialized.guard';
import {SwiperModule} from 'swiper/angular';
import {ServerSetupComponent} from './views/server-setup/server-setup.component';
import {IsSmartphoneGuard} from './guards/is-smartphone.guard';
import {AnyServerGuard} from './guards/any-server.guard';
import {AppRoutes} from '../../services/routing.service';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [SmartphoneInitializedGuard, AnyServerGuard],
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
    path: AppRoutes.firstRun,
    component: FirstRunComponent,
    canActivate: [SmartphoneNotInitializedGuard]
  },
  {
    path: AppRoutes.serverSetup,
    component: ServerSetupComponent,
    canActivate: [SmartphoneInitializedGuard],
  },
];

@NgModule ({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild (routes),
    TranslateModule,
    ComponentsModule,
    SwiperModule
  ],
  exports: [],
  declarations: [BaseComponent, ServerSetupComponent, FirstRunComponent]
})
export class SmartphoneModule { }
