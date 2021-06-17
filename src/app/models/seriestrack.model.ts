import {SeriesModel} from './series.model';
import {ChapterTrackModel} from './chaptertrack.model';
import {ChapterModel} from './chapter.model';

export interface SeriesTrackModel {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IdUser: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IdSeries: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Series: SeriesModel;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ChapterTrack: ChapterTrackModel;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Chapter: ChapterModel;
}
