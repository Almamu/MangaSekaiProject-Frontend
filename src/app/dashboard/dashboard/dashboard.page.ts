import {Component} from '@angular/core';
import {ViewDidEnter} from '@ionic/angular';
import {SeriesService} from '../../services/series.service';
import {SeriesModel} from '../../models/series.model';
import {SeriesTrackModel} from '../../models/seriestrack.model';
import {TrackingService} from '../../services/tracking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements ViewDidEnter {

  series: SeriesModel [];
  tracking: SeriesTrackModel[];

  constructor (private seriesService: SeriesService, private trackingService: TrackingService) {
  }

  ionViewDidEnter () {
    this.seriesService.getDiscover ().subscribe (result => {
      this.series = result;
    });
    this.trackingService.getTracking ().subscribe (result => {
      this.tracking = result;
    });
  }

}
