import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {ServerModel} from '../../models/server.model';
import {AuthenticationService} from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor () { }

  api (endpoint: string, server: ServerModel) {
    const settings = environment.api;
    const basepath = this.trim (settings.basepath);
    endpoint = this.trim (endpoint);

    return server.address + '/' + basepath + '/' + endpoint + '/';
  }

  /**
   * TODO: THIS SHOULD BE REPLACED ONCE THE PHP API IS FIXED
   *
   * @param server
   * @param fullpath The path to add the hostname and port to
   */
  basepath (fullpath: string, server: ServerModel): string {
    fullpath = this.trim (fullpath);

    return this.trim (server.address) + '/' + fullpath + '/';
  }

  private trim (str: string): string {
    return str
      .replace (new RegExp('[\/]+$'), '')
      .replace (new RegExp('^[\/]+'), '');
  }

}
