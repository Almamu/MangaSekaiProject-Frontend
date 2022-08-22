import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard/dashboard.page';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../components/components.module';
import {SeriesPage} from './series/series.page';
import {ChapterPage} from './chapter/chapter.page';
import {AuthenticationGuard} from '../authentication/guards/authentication-guard.service';
import {SmartphoneInitializedGuard} from '../smartphone/guards/smartphone-initialized.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate: [AuthenticationGuard, SmartphoneInitializedGuard]
  },
  {
    path: 'series/:seriesId',
    component: SeriesPage,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'series/:seriesId/chapter/:chapterId',
    component: ChapterPage,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ComponentsModule
  ],
  exports: [RouterModule],
  declarations: [DashboardPage, SeriesPage, ChapterPage]
})
export class DashboardPageModule {}
