import {Component} from '@angular/core';
import {ViewDidEnter} from '@ionic/angular';
import {SeriesService} from '../../../services/series.service';
import {SeriesModel} from '../../../models/series.model';
import {SeriesTrackModel} from '../../../models/seriestrack.model';
import {TrackingService} from '../../../services/tracking.service';
import {LoaderModel} from '../../../models/loader.model';
import RoutingService, {AppRoutes} from '../../../services/routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements ViewDidEnter {
  series: LoaderModel <SeriesModel []> = new LoaderModel<SeriesModel[]>();
  tracking: LoaderModel <SeriesTrackModel[]> = new LoaderModel<SeriesTrackModel[]>();

  constructor (
    private seriesService: SeriesService,
    private trackingService: TrackingService,
    private routing: RoutingService) { }

  ionViewDidEnter () {
    this.seriesService.getDiscover ().subscribe (result => {
      this.series.data = result;
      this.series.loading = false;
    }, error => {
      this.series.error = true;
      this.series.loading = false;
    });
    this.trackingService.getTracking ().subscribe (result => {
      this.tracking.data = result;
      this.tracking.loading = false;
    }, error => {
      this.tracking.error = true;
      this.tracking.loading = false;
    });
  }

  seriesPath (id: number): string {
    return this.routing.seriesPath(id);
  }

  chapterPath (mangaId: number, chapterId: number): string {
    return this.routing.chapterPath (mangaId, chapterId);
  }

}
