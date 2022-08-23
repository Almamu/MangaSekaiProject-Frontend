import {Component} from '@angular/core';
import {SettingsServiceProvider} from '../../../providers/settings-service.provider';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-server-setup',
  templateUrl: './server-setup.component.html'
})
export class ServerSetupComponent {
  form: FormGroup;

  constructor (
    private settings: SettingsServiceProvider,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private loader: LoadingController,
    private router: Router,
    private alert: AlertController
  ) {
    this.form = ServerSetupComponent.build (fb);
  }

  static build (fb: FormBuilder): FormGroup {
    const urlregex = '(https?://)?([\\da-z.-]+)[:\\d/\\w .-]*/?';

    return fb.group ({
      address: ['', [Validators.required, Validators.pattern (urlregex)]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      alias: ['']
    });
  }

  get address () {
    return this.form.get ('address');
  }
  get username () {
    return this.form.get ('username');
  }
  get password () {
    return this.form.get ('password');
  }
  get alias () {
    return this.form.get ('alias');
  }

  async addServer () {
    if (this.form.invalid)
      return;

    const server = {
      address: this.address.value,
      alias: this.alias.value,
      token: '',
      selected: true
    };

    const loader = await this.loader.create ({
      message: 'Connecting to ' + server.address,
    });
    const errorAlert = await this.alert.create ({
      header: 'Error',
      message: 'Cannot login to ' + server.address,
      buttons: ['OK']
    });
    const successAlert = await this.alert.create ({
      header: 'Success',
      message: 'Server ' + server.address + ' added successfully!',
      buttons: ['OK']
    });

    await loader.present ();

    // perform a login test first
    await this.auth.login (this.username.value, this.password.value, server)
      .subscribe (
        result => {
          // update loader message
          loader.message = 'Saving settings...';
          // login success! store the token in the new server object
          server.token = JSON.stringify (result);
          // as a good practice, autoselect the new server
          this.auth.selectedServer = server;
          // add the server to the list
          this.settings.instance.addServer (server);
          // save the settings
          this.settings.instance.save ().subscribe (_ => {
            // clear the form's data
            this.form.reset ();
            // hide the loader
            loader.dismiss ();
            // show the success message
            successAlert.present ();
            // take the user to the dashboard
            this.router.navigateByUrl ('/mobile/home', {replaceUrl: true});
          },
          e => {
            errorAlert.present ();
          });
        },
        err => {
          errorAlert.present ();
          // login failed! show a modal with the error message
          loader.dismiss ();
        }
      );
  }
}
