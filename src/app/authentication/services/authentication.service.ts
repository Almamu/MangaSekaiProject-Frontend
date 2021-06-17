import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../network/services/api.service';
import {SessionModel} from '../models/session.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private mSession: SessionModel;

  constructor (private http: HttpClient, private api: ApiService) {
    // check if there's anything in the local storage that resembles a valid mSession
    const sessionJSON = localStorage.getItem ('session');

    try {
      this.mSession = SessionModel.fromJSON (sessionJSON);
    } catch {
      // ignored, the mSession can be invalid if the user has not logged in yet
    }
  }

  save () {
    localStorage.setItem ('session', SessionModel.toJSON (this.mSession));

    // TODO: LOOK INTO WHY HTTPCLIENT GET DOESN'T RETURN AN INSTANCE OF THE CLASS (SO NO FUNCTIONS IN IT CAN BE CALLED)
    this.mSession = SessionModel.fromJSON(localStorage.getItem ('session'));
  }

  /**
   * Performs login against the MangaSekaiProject's backend
   *
   * @param username
   * @param password
   */
  login (username: string, password: string) {
    const authorization = 'Basic ' + btoa (encodeURIComponent (username) + ':' + encodeURIComponent (password));
    const url = this.api.url ('login');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = new HttpHeaders ({Authorization: authorization});

    return new Observable<SessionModel> ((observer) =>
      this.http.get<SessionModel> (url, {headers}).subscribe((result) => {
        this.mSession = result;
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
    // ensure the mSession reference is destroyed
    this.mSession = null;
  }
}
