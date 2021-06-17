import {ChapterModel} from './chapter.model';
import {SeriesModel} from './series.model';

export interface PagesModel {
  pages: string [];
  chapter: ChapterModel;
  serie: SeriesModel;
  next: ChapterModel|null;
  previous: ChapterModel|null;
}
