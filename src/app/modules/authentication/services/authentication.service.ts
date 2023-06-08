import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../network/services/api.service';
import {SessionModel} from '../models/session.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ServerModel} from '../../../models/server.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private mSession: SessionModel;
  private mServer: ServerModel = null;

  constructor (private http: HttpClient, private api: ApiService) {
    // check if there's anything in the local storage that resembles a valid mSession
    const sessionJSON = localStorage.getItem ('session');
    const serverJSON = localStorage.getItem ('server');

    try {
      this.mSession = SessionModel.fromJSON (sessionJSON);
    } catch {
      // ignored, the mSession can be invalid if the user has not logged in yet
    }

    try {
      this.mServer = JSON.parse (serverJSON);
    } catch {
      // ignored, the mServer can be invalid if the user has not logged in yet
    }
  }

  save () {
    localStorage.setItem ('server', JSON.stringify (this.mServer));
    localStorage.setItem ('session', SessionModel.toJSON (this.mSession));

    this.mSession = SessionModel.fromJSON(localStorage.getItem ('session'));
    this.mServer = JSON.parse (localStorage.getItem ('server'));
  }

  /**
   * Performs login against the MangaSekaiProject's backend
   *
   * @param username
   * @param password
   * @param server
   */
  login (username: string, password: string, server: ServerModel = this.mServer) {
    const authorization = 'Basic ' + btoa (encodeURIComponent (username) + ':' + encodeURIComponent (password));
    const url = this.api.api ('login', server);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = new HttpHeaders ({Authorization: authorization});

    return new Observable<SessionModel> ((observer) =>
      this.http.get<SessionModel> (url, {headers}).subscribe((result) => {
        this.mSession = result;
        this.mServer = server;
        this.save ();

        observer.next (result);
      }, (error) => {
        // TODO: PROPER ERROR HANDLING
        observer.error (error);
      })
    );
  }

  /**
   * Indicates if there's a valid mSession active or not
   */
  validateSession (): boolean {
    return this.mSession && this.mSession.valid;
  }

  get session (): SessionModel {
    return this.mSession;
  }
  get selectedServer (): ServerModel {
    return this.mServer;
  }
  set selectedServer (value: ServerModel) {
    this.mServer = value;
    this.mSession = SessionModel.fromJSON (this.mServer.token);
  }

  /**
   * Logs out the current mSession
   *
   * For now the backend doesn't support this, so it behaves like the destroy function
   */
  logout () {
    this.destroy ();
  }

  /**
   * Destroys the current session data without performing a clean logout
   */
  destroy () {
    // empty the mSession data on the local storage
    localStorage.setItem ('session', '');
    localStorage.setItem ('server', '');
    // ensure the mSession reference is destroyed
    this.mSession = null;
    this.mServer = null;
  }
}
