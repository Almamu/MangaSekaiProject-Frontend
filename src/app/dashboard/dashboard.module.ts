import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard/dashboard.page';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {AuthenticationResolver} from '../authentication/resolvers/authentication.resolver';
import {ComponentsModule} from '../components/components.module';
import {SeriesPage} from './series/series.page';
import {ChapterPage} from './chapter/chapter.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    resolve: {
      auth: AuthenticationResolver
    }
  },
  {
    path: 'series/:seriesId',
    component: SeriesPage,
    resolve: {
      auth: AuthenticationResolver
    }
  },
  {
    path: 'series/:seriesId/chapter/:chapterId',
    component: ChapterPage,
    resolve: {
      auth: AuthenticationResolver
    }
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
