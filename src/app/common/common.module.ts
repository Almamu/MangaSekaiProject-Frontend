import {CommonModule as AngularCommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../components/components.module';
import {DeviceDetectorComponent} from './device-detector/device-detector.component';
import {NgModule} from '@angular/core';
import {SmartphoneModule} from '../smartphone/smartphone.module';
import {WebModule} from '../web/web.module';

const routes: Routes = [
  {
    path: '',
    component: DeviceDetectorComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
    ]
  }
];

@NgModule ({
  imports: [
    AngularCommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild (routes),
    TranslateModule,
    ComponentsModule,
    SmartphoneModule,
    WebModule
  ],
  exports: [RouterModule],
  declarations: [DeviceDetectorComponent]
})
export class CommonModule {}
