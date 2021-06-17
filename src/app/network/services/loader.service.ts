import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private references = 0;
  private loader;
  private timeout;

  constructor (private loadingController: LoadingController) { }

  /**
   * Ensures that a loader is displayed if the timeout for an HTTP request was exceeded
   */
  async updateLoader () {
    if (this.references === 0 && this.loader) {
      console.dir ('DESTROYING LOADER');
      await this.loader.dismiss ();
      this.loader = null;
    }
    if (this.references > 0 && !this.loader) {
      console.dir ('CREATING LOADER');
      this.loader = await this.loadingController.create ({
        spinner: 'circles'
      });

      await this.loader.present ();
    }
  }

  /**
   * Clears the timeout (if any)
   */
  clearTimeout () {
    if (this.timeout)
      clearTimeout (this.timeout);

    this.timeout = null;
  }

  /**
   * Sets up a new timeout
   */
  setupTimeout () {
    // TODO: FIX LOADER NOT APPEARING PROPERLY
    // this.timeout = setTimeout (this.updateLoader.bind (this), 100);
  }

  /**
   * Signals the service that an http request is pending
   */
  increaseReferences () {

    this.clearTimeout ();

    this.references ++;

    this.setupTimeout ();
  }

  /**
   * Signals the service that an http request is finished
   */
  decrementReferences () {

    this.clearTimeout ();

    this.references --;

    this.setupTimeout ();
  }
}
