import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, Platform} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../components/components.module';
import {NgModule} from '@angular/core';
import {BaseComponent} from './views/base/base.component';
import {RouterModule, Routes} from '@angular/router';
import {FirstRunComponent} from './views/first-run/first-run.component';
import {SmartphoneInitializedGuard} from './guards/smartphone-initialized.guard';
import {SmartphoneNotInitializedGuard} from './guards/smartphone-not-initialized.guard';
import {SettingsServiceProvider} from "../providers/settings-service.provider";
import {SqlSettingsService} from "../services/sql-settings.service";
import {SQLitePorter} from "@awesome-cordova-plugins/sqlite-porter/ngx";
import {SQLite} from "@awesome-cordova-plugins/sqlite/ngx";

const routes: Routes = [
  {
    path: 'first-run',
    component: FirstRunComponent,
    canActivate: [SmartphoneNotInitializedGuard],
    canDeactivate: [SmartphoneInitializedGuard]
  }
];

@NgModule ({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild (routes),
    TranslateModule,
    ComponentsModule,
  ],
  exports: [BaseComponent],
  declarations: [BaseComponent]
})
export class SmartphoneModule {
  constructor (platform: Platform, settings: SettingsServiceProvider) {
    platform.ready ().then (() => {
      if (platform.is ('hybrid') === true)
        settings.instance = new SqlSettingsService(platform, new SQLite (), new SQLitePorter ());
    });
  }
}
