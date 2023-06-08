import {HttpClient} from '@angular/common/http';
import {SeriesTrackModel} from '../models/seriestrack.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {InstanceApiService} from '../modules/network/services/instance-api.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  constructor (public api: InstanceApiService, public http: HttpClient) { }

  getTracking (): Observable<SeriesTrackModel[]> {
    const url = this.api.api ('track/series');

    return this.http.get <SeriesTrackModel []> (url);
  }
}
