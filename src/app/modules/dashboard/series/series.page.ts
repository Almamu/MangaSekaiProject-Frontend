import { Component, OnInit } from '@angular/core';
import {ViewDidEnter} from '@ionic/angular';
import {SeriesService} from '../../../services/series.service';
import {SeriesModel} from '../../../models/series.model';
import {ActivatedRoute} from '@angular/router';
import {ChapterModel} from '../../../models/chapter.model';
import {GenreModel} from '../../../models/genre.model';
import {StaffModel} from '../../../models/staff.model';
import RoutingService from '../../../services/routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements ViewDidEnter {

  serie: SeriesModel;
  chapters: ChapterModel[];

  constructor (
    private seriesService: SeriesService,
    private activatedRoute: ActivatedRoute,
    private routing: RoutingService
  ) { }

  ionViewDidEnter () {
    const seriesId = parseInt (this.activatedRoute.snapshot.paramMap.get ('seriesId'), 10);

    this.seriesService.getSeries (seriesId).subscribe (result => {
      this.serie = result;
    });
    this.seriesService.getChapters (seriesId).subscribe (result => {
      this.chapters = result;
    });
  }

  searchByGenre (genre: GenreModel) {

  }

  searchByStaff (staff: StaffModel) {

  }

  chapterPath (mangaId: number, chapterId: number): string {
    return this.routing.chapterPath (mangaId, chapterId);
  }

  backPath (): string {
    return this.routing.homePath ();
  }
}
