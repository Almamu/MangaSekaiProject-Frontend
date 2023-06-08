import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ServerSettingsService} from '../../../services/server-settings.service';
import {LoaderModel} from '../../../models/loader.model';
import {UsersService} from '../../../services/users.service';
import {AuthenticationService} from '../../authentication/services/authentication.service';
import {ServerModel} from '../../../models/server.model';
import {ModalController} from '@ionic/angular';
import {DiscoveryModal} from './discovery-modal/discovery.modal';
import {EditUserModal} from './edit-user-modal/edit-user.modal';
import {CreateUserModal} from './create-user-modal/create-user.modal';
import {SplashScreen} from '@capacitor/splash-screen';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit, AfterViewInit {
  admins: LoaderModel <number []> = new LoaderModel <number[]>();
  folders: LoaderModel <string []> = new LoaderModel <string[]>();
  userList: LoaderModel <Record <number, string>> = new LoaderModel <Record <number, string>>();
  selectedServer: ServerModel;
  savingFolders = false;
  savingAdmins = false;

  constructor (
    private users: UsersService,
    private serverSettings: ServerSettingsService,
    private auth: AuthenticationService,
    private modal: ModalController
  ) { }

  ngOnInit (): void {
    this.getAdministratorUsers ();
    this.getUsers ();
    this.getScannerDirs ();

    this.selectedServer = this.auth.selectedServer;
  }

  ngAfterViewInit (): void {
    SplashScreen.hide ();
  }

  getAdministratorUsers (): void {
    this.serverSettings.getAdministratorUsers ().subscribe (res => {
      this.admins.data = res.Value;
      this.admins.loading = false;
    }, err => {
      this.admins.loading = false;
      this.admins.error = true;
    });
  }

  getScannerDirs (): void {
    this.serverSettings.getScannerDirs ().subscribe (res => {
      this.folders.data = res.Value;
      this.folders.loading = false;
    }, err => {
      this.folders.loading = false;
      this.folders.error = true;
    });
  }

  getUsers (): void {
    this.users.getUsers ().subscribe (res => {
      this.userList.data = res;
      this.userList.loading = false;
    }, err => {
      this.userList.loading = false;
      this.userList.error = true;
    });
  }

  editUser (userId: string, username: string): void {
    this.modal.create ({
      component: EditUserModal,
      componentProps: {username}
    }).then (modal => {
      modal.onWillDismiss ().then (res => {
        if (res.role !== 'okay')
          return;

        const intUserId = parseInt (userId, 10);
        this.userList.loading = true;
        this.userList.error = false;
        // perform user change
        this.users.updateUser (intUserId, res.data.username, res.data.password).subscribe (() => {
          // update user list
          this.getUsers ();
        }, err => {
          this.userList.loading = false;
          this.userList.error = true;
        });
      });

      modal.present ();
    });
  }

  createUser (): void {
    this.modal.create ({
      component: CreateUserModal
    }).then (modal => {
      modal.onWillDismiss ().then (res => {
        if (res.role !== 'okay')
          return;

        this.userList.loading = true;
        this.userList.error = false;
        this.userList.data = {};

        // perform user change
        this.users.createUser (res.data.username, res.data.password).subscribe (() => {
          // update user list
          this.getUsers ();
        }, err => {
          this.userList.loading = false;
          this.userList.error = true;
        });
      });

      modal.present ();
    });
  }

  removeFolder (folder: string): void {
    this.savingFolders = true;
    this.folders.data = this.folders.data.filter (x => x !== folder);
    this.saveFolders ();
  }

  addFolder (): void {
    this.modal.create ({
      component: DiscoveryModal
    }).then (modal => {
      modal.onWillDismiss ().then (res => {
        if (res.role !== 'okay')
          return;

        // add the folder to the list and save the settings
        this.savingFolders = true;
        this.folders.data.push (res.data);
        this.saveFolders ();
      });

      modal.present ();
    });
  }

  isCurrentUser (userId: string): boolean {
    return this.auth.session.user_id === parseInt (userId, 10);
  }

  isAdmin (userId: string): boolean {
    const value = parseInt (userId, 10);

    return this.admins.data.findIndex (x => x === value) !== -1;
  }

  switchAdmin (userId: string): void {
    const intUserId = parseInt (userId, 10);

    if (this.isAdmin (userId) === true)
      this.admins.data = this.admins.data.filter (x => x !== intUserId);
    else
      this.admins.data.push (intUserId);

    // admin switched, save changes
    this.savingAdmins = true;
    this.saveAdmins ();
  }

  removeUser (userId: string): void {
    const intUserId = parseInt (userId, 10);
    this.userList.loading = true;
    this.userList.error = false;
    this.userList.data = {};

    this.users.deleteUser (parseInt (userId, 10)).subscribe (res => {
      this.getUsers ();
    }, err => {
      // TODO: HANDLE ERROR!
      this.userList.loading = false;
      this.userList.error = true;
    });
  }

  private saveFolders (): void {
    this.serverSettings.saveScannerDirs (this.folders.data).subscribe (() => {
      this.savingFolders = false;
    }, err => {
      this.savingFolders = false;
      // TODO: HANDLE ERROR!
    });
  }

  private saveAdmins (): void {
    this.serverSettings.saveAdministratorUsers (this.admins.data).subscribe (() => {
      this.savingAdmins = false;
    }, err => {
      this.savingAdmins = false;
      // TODO: HANDLE ERROR!
    });
  }
}
