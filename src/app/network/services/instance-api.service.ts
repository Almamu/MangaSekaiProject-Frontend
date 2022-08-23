import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {ServerModel} from '../../models/server.model';
import {AuthenticationService} from '../../authentication/services/authentication.service';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InstanceApiService {
  constructor (
    private parent: ApiService,
    private auth: AuthenticationService
  ) { }

  api (endpoint: string, server: ServerModel = this.auth.selectedServer) {
    return this.parent.api (endpoint, server);
  }

  /**
   * TODO: THIS SHOULD BE REPLACED ONCE THE PHP API IS FIXED
   *
   * @param server
   * @param fullpath The path to add the hostname and port to
   */
  basepath (fullpath: string, server: ServerModel = this.auth.selectedServer): string {
    return this.parent.basepath (fullpath, server);
  }

}
