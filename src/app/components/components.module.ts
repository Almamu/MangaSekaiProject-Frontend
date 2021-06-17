import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MangaCoverComponent} from './manga-cover/manga-cover.component';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {ChapterCoverComponent} from './chapter-cover/chapter-cover.component';
import {CoverContainerComponent} from './cover-container/cover-container.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  declarations: [MangaCoverComponent, ChapterCoverComponent, CoverContainerComponent],
  exports: [MangaCoverComponent, ChapterCoverComponent, CoverContainerComponent]
})
export class ComponentsModule {
}
