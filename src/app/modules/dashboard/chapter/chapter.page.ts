import {Component, ViewChild} from '@angular/core';
import {PagesModel} from '../../../models/pages.model';
import {IonModal, ViewDidEnter} from '@ionic/angular';
import {SeriesService} from '../../../services/series.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticatedApiService} from '../../authentication/services/authenticated-api.service';
import RoutingService from '../../../services/routing.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements ViewDidEnter {
  @ViewChild(IonModal) modal: IonModal;
  pages: PagesModel;
  readMode: string;
  selectedReadMode: string;
  sliderOptions = {
    preventClicksPropagation: true
  };

  constructor (
    private seriesService: SeriesService,
    private activatedRoute: ActivatedRoute,
    public api: AuthenticatedApiService,
    private routing: RoutingService
  ) {
    this.readMode = localStorage.getItem ('readmode');

    if (this.readMode !== 'horizontal' && this.readMode !== 'vertical')
      this.readMode = 'horizontal';

    this.selectedReadMode = this.readMode;
  }

  ionViewDidEnter () {
    const seriesId = parseInt (this.activatedRoute.snapshot.paramMap.get ('seriesId'), 10);
    const chapterId = parseInt (this.activatedRoute.snapshot.paramMap.get ('chapterId'), 10);

    // TODO: HANDLE CHAPTER NOT FOUND HERE
    this.seriesService.getPages (seriesId, chapterId).subscribe (result => {
      this.pages = result;
    });
  }

  setReadMode (newMode: string) {
    localStorage.setItem ('readmode', this.selectedReadMode = this.readMode = newMode);
  }

  onScroll (event) {
    console.dir (event);
  }

  seriesPath (mangaId: number): string {
    return this.routing.seriesPath (mangaId);
  }

  chapterPath (mangaId: number, chapterId: number): string {
    return this.routing.chapterPath (mangaId, chapterId);
  }

  closeSettingsModal (): void {
    this.selectedReadMode = this.readMode;
    this.modal.dismiss (null, 'cancel');
  }

  saveSettingsModal (): void {
    this.modal.dismiss(this.selectedReadMode, 'confirm');
  }

  onWillDismiss (event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;

    if (ev.detail.role === 'confirm')
      this.setReadMode (ev.detail.data);
  }

  updateSelectedReadMode (newValue: string): void {
    this.selectedReadMode = newValue;
  }
}
