import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, Platform} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../components/components.module';
import {NgModule} from '@angular/core';
import {BaseComponent} from './views/base/base.component';
import {RouterModule, Routes} from '@angular/router';
import {FirstRunComponent} from './views/first-run/first-run.component';
import {SmartphoneInitializedGuard} from './guards/smartphone-initialized.guard';
import {SmartphoneNotInitializedGuard} from './guards/smartphone-not-initialized.guard';
import {SettingsServiceProvider} from '../providers/settings-service.provider';
import {SqlSettingsService} from '../services/sql-settings.service';
import {SQLitePorter} from '@awesome-cordova-plugins/sqlite-porter/ngx';
import {SQLite} from '@awesome-cordova-plugins/sqlite/ngx';
import {SwiperModule} from 'swiper/angular';
import {ServerSetupComponent} from './views/server-setup/server-setup.component';
import {IsSmartphoneGuard} from './guards/is-smartphone.guard';
import {AuthenticationService} from '../authentication/services/authentication.service';
import {AnyServerGuard} from './guards/any-server.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [IsSmartphoneGuard, SmartphoneInitializedGuard, AnyServerGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      }
    ]
  },
  {
    path: 'first-run',
    component: FirstRunComponent,
    canActivate: [SmartphoneNotInitializedGuard]
  },
  {
    path: 'server-setup',
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
