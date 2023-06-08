import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SQLite} from '@awesome-cordova-plugins/sqlite/ngx';
import {SQLiteObject} from '@awesome-cordova-plugins/sqlite';
import {SQLitePorter} from '@awesome-cordova-plugins/sqlite-porter/ngx';
import {concat, forkJoin, Observable} from 'rxjs';
import {SettingsService} from './settings.service';
import {ServerModel} from '../models/server.model';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AuthenticationService} from '../modules/authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SqlSettingsService extends SettingsService {
  private db: SQLiteObject;
  private servers: ServerModel [];

  constructor (
    private platform: Platform,
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter,
    private auth: AuthenticationService
  ) {
    super ();
  }

  get isMobile (): boolean {
    return true;
  }

  /**
   * Stores all the settings into the database
   *
   * @private
   */
  save (): Observable <any> {
    const requests: Promise <any>[] = [];

    // run all the sql queries
    for (const key of Object.keys (this.settings)) {
      requests.push (
        this.db.executeSql (
          'REPLACE INTO settings (name, value)VALUES(?, ?)',
          [key, JSON.stringify (this.settings [key])]
        )
      );
    }

    const serversEmptyRequest = this.db.executeSql ('DELETE FROM servers', []);

    // store server list, the easiest way is to remove all of them and re-add them
    for (const entry of this.servers) {
      requests.push (
        this.db.executeSql (
          'INSERT INTO servers (address, token, alias, selected)VALUES(?, ?, ?, ?)',
          [entry.address, entry.token, entry.alias, entry.selected]
        )
      );
    }

    // run requests in the proper order for it to save properly
    return concat(fromPromise (serversEmptyRequest), forkJoin (requests));
  }

  get serverList (): ServerModel [] {
    return this.servers;
  }

  addServer (server: ServerModel): void {
    this.servers.push (server);
  }

  removeServer (server: ServerModel): void {
    // filter the array and remove the addresses that match
    this.servers = this.servers.filter (x => x !== server);

    if (this.servers.length > 0)
      // if selected server is the same we are removing, switch to a different one
      this.auth.selectedServer = this.servers [0];
    else
      this.auth.destroy ();
  }

  /**
   * Ensure the SQLite database is available
   *
   * @private
   */
  public async initialize () {
    const sql =
      'CREATE TABLE IF NOT EXISTS "settings" ("name" TEXT, "value" TEXT, PRIMARY KEY("name") );' +
      'INSERT OR IGNORE INTO "main"."settings"("name","value") VALUES ("first-run-completed", "false");' +
      'CREATE TABLE IF NOT EXISTS "servers" ("address" TEXT NOT NULL, "token" TEXT NOT NULL, "alias" TEXT NOT NULL, "selected" NUMERIC NOT NULL DEFAULT 0, PRIMARY KEY("address"));';

    await this.platform.ready ();
    this.db = await this.sqlite.create ({
      name: 'data.db',
      location: 'default'
    });

    await this.sqlitePorter.importSqlToDb (this.db, sql);
    // load all the settings
    const settingsDb = await this.db.executeSql('SELECT * FROM settings', []);
    // cleanup stored settings just in case
    this.settings = {};
    // parse all the values
    for (let i = 0; i < settingsDb.rows.length; i++) {
      // store the value in memory
      this.settings [settingsDb.rows.item(i).name] = JSON.parse(settingsDb.rows.item(i).value);
    }

    const serversDb = await this.db.executeSql('SELECT * FROM servers', []);
    // cleanup stored server list
    this.servers = [];
    // parse all the servers
    for (let i = 0; i < serversDb.rows.length; i++) {
      const server = {
        address: serversDb.rows.item(i).address,
        token: serversDb.rows.item(i).token,
        alias: serversDb.rows.item(i).alias,
        selected: serversDb.rows.item(i).selected === 1
      };
      // add the server to the list
      this.servers.push(server);
      // if the server is marked as selected store it in the authorizationservice too
      this.auth.selectedServer = server;
    }
  }
}
