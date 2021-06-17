import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url (endpoint: string) {
    const settings = environment.api;

    return settings.protocol + '://' + settings.hostname + ':' + settings.port + settings.basepath + endpoint + '/';
  }
}
