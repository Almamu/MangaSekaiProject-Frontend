import { Component, OnInit } from '@angular/core';
import {ChapterModel} from '../../models/chapter.model';
import {PagesModel} from '../../models/pages.model';
import {ViewDidEnter} from '@ionic/angular';
import {SeriesService} from '../../services/series.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements ViewDidEnter {

  pages: PagesModel;
  readMode: string;

  constructor (private seriesService: SeriesService, private activatedRoute: ActivatedRoute) {
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
    this.readMode = newMode;
  }
}
