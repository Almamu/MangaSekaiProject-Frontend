import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../network/services/api.service';
import {SeriesModel} from '../models/series.model';
import {Observable} from 'rxjs';
import {ChapterTrackModel} from "../models/chaptertrack.model";
import {ChapterModel} from "../models/chapter.model";
import {PagesModel} from "../models/pages.model";

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  constructor (private http: HttpClient, private api: ApiService) {

  }

  getDiscover (): Observable<SeriesModel[]> {
    const url = this.api.url ('series');

    return this.http.get <SeriesModel[]> (url);
  }

  getSeries (seriesId: number): Observable<SeriesModel> {
    const url = this.api.url ('series/' + seriesId);

    return this.http.get <SeriesModel> (url);
  }

  getChapters (seriesId: number): Observable<ChapterModel[]> {
    const url = this.api.url ('series/' + seriesId + '/chapters');

    return this.http.get <ChapterModel[]> (url);
  }

  getPages (seriesId: number, chapterId: number): Observable<PagesModel> {
    const url = this.api.url ('series/' + seriesId + '/chapter/' + chapterId);

    return this.http.get <PagesModel> (url);
  }
}
