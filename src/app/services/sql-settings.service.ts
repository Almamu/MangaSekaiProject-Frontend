import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SQLite} from '@awesome-cordova-plugins/sqlite/ngx';
import {SQLiteObject} from '@awesome-cordova-plugins/sqlite';
import {SQLitePorter} from '@awesome-cordova-plugins/sqlite-porter/ngx';
import {forkJoin, Observable} from 'rxjs';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class SqlSettingsService extends SettingsService {
  private db: SQLiteObject;

  constructor (
    private platform: Platform,
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter
  ) {
    super ();

    this.initialize ();
  }

  isMobile (): boolean {
    return true;
  }

  /**
   * Stores all the settings into the database
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

    // run all the requests
    return forkJoin(requests);
  }

  /**
   * Ensure the SQLite database is available
   *
   * @private
   */
  private initialize (): void {
    const sql =
      'CREATE TABLE IF NOT EXISTS "settings" ("name" TEXT, "value" TEXT, PRIMARY KEY("name") );' +
      'INSERT OR IGNORE INTO "main"."settings"("name","value") VALUES ("first-run-completed", "false");';

    this.platform.ready ().then (() => {
      this.sqlite.create ({
        name: 'data.db',
        location: 'default'
      })
      .then (db => {
        this.db = db;

        this.sqlitePorter.importSqlToDb (this.db, sql)
          .then (() => {
            // load all the settings
            this.db.executeSql ('SELECT * FROM settings')
              .then (res => {
                // parse all the values
                for (let i = 0; i < res.rows.length; i ++) {
                  // store the value in memory
                  this.settings [res.rows.item (i).name] = JSON.parse (res.rows.item (i).value);
                }
              });
          })
          .catch (e => {
            // TODO: HANDLE ERROR; THIS IS A MUST
          });
      })
      .catch (err => {
        // TODO: HANDLE ERROR; THIS IS A MUST
      });
    });
  }
}
