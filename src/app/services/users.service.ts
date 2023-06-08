import {InstanceApiService} from '../modules/network/services/instance-api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor (private http: HttpClient, private api: InstanceApiService) { }

  getUsers (): Observable<Record<number, string>> {
    const url = this.api.api ('user/list');

    return this.http.get <Record<number, string>> (url);
  }

  updateUser (userId: number, username: string, newPassword?: string): Observable<void> {
    const url = this.api.api ('user/list');
    const payload: Record<string, any> = {id: userId, username};

    if (newPassword)
      payload.newPassword = newPassword;

    return this.http.patch <void> (url, payload);
  }

  createUser (username: string, password: string): Observable <void> {
    const url = this.api.api ('user/list');

    return this.http.post <void> (url, {username, password});
  }

  deleteUser (userId: number): Observable <void> {
    const url = this.api.api ('user/' + encodeURIComponent (userId));

    return this.http.delete <void> (url);
  }
}
