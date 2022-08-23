import {Injectable} from '@angular/core';
import {ApiService} from '../../network/services/api.service';
import {AuthenticationService} from './authentication.service';
import {InstanceApiService} from '../../network/services/instance-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedApiService {
  constructor (
    private auth: AuthenticationService,
    private apiService: InstanceApiService
  ) { }

  api (endpoint: string) {
    return this.apiService.api (endpoint) + '?token=' + this.auth.session.token;
  }

  basepath (fullpath: string) {
    return this.apiService.basepath (fullpath) + '?token=' + this.auth.session.token;
  }
}
