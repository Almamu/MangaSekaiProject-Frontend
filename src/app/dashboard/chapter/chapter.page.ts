import { Component, OnInit } from '@angular/core';
import {ChapterModel} from '../../models/chapter.model';
import {PagesModel} from '../../models/pages.model';
import {ViewDidEnter} from '@ionic/angular';
import {SeriesService} from '../../services/series.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticatedApiService} from '../../authentication/services/authenticated-api.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements ViewDidEnter {

  pages: PagesModel;
  readMode: string;
  sliderOptions = {
    preventClicksPropagation: true
  };

  constructor (
    private seriesService: SeriesService,
    private activatedRoute: ActivatedRoute,
    private api: AuthenticatedApiService
  ) {
    this.readMode = localStorage.getItem ('readmode');

    if (this.readMode !== 'horizontal' && this.readMode !== 'vertical')
      this.readMode = 'horizontal';
  }

  ionViewDidEnter () {
    const seriesId = parseInt (this.activatedRoute.snapshot.paramMap.get ('seriesId'), 10);
    const chapterId = parseInt (this.activatedRoute.snapshot.paramMap.get ('chapterId'), 10);

    this.seriesService.getPages (seriesId, chapterId).subscribe (result => {
      this.pages = result;
    });
  }

  setReadMode (newMode: string) {
    localStorage.setItem ('readmode', this.readMode = newMode);
  }

  onScroll (event) {
    console.dir (event);
  }
}
