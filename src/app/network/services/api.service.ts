import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api (endpoint: string) {
    const settings = environment.api;
    const basepath = this.trim (settings.basepath);
    endpoint = this.trim (endpoint);

    return settings.protocol + '://' + settings.hostname + ':' + settings.port + '/' + basepath + '/' + endpoint + '/';
  }

  /**
   * TODO: THIS SHOULD BE REPLACED ONCE THE PHP API IS FIXED
   *
   * @param fullpath The path to add the hostname and port to
   */
  basepath (fullpath: string) {
    const settings = environment.api;
    fullpath = this.trim (fullpath);

    return settings.protocol + '://' + settings.hostname + ':' + settings.port + '/' + fullpath + '/';
  }

  private trim (str: string): string {
    return str
      .replace (new RegExp('[\/]+$'), '')
      .replace (new RegExp('^[\/]+'), '');
  }

}
