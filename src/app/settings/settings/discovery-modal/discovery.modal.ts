import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LoaderModel} from '../../../models/loader.model';
import {ServerSettingsService} from '../../../services/server-settings.service';
import {DirectoryListModel} from '../../../models/directory-list.model';
import {BehaviorSubject} from 'rxjs';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-discovery-modal',
  templateUrl: './discovery.modal.html',
  styleUrls: ['./discovery.modal.scss']
})
export class DiscoveryModal implements OnInit {
  currentDirectory = '';
  folders: LoaderModel <DirectoryListModel> = new LoaderModel <DirectoryListModel>();
  @ViewChild ('content') content;

  constructor (
    private serverSettings: ServerSettingsService,
    private modal: ModalController
  ) { }

  confirm (): void {
    this.modal.dismiss (this.currentDirectory, 'okay');
  }

  cancel (): void {
    this.modal.dismiss (null, 'cancel');
  }

  ngOnInit (): void {
    this.gotoFolder ('/');
  }

  gotoFolder (directory: string): void {
    this.currentDirectory += '/' + directory;
    this.folders.error = false;
    this.folders.loading = true;

    this.serverSettings.listFiles (this.currentDirectory).subscribe (res => {
      this.content.scrollToTop ();
      this.folders.loading = false;
      this.folders.data = res;
      this.currentDirectory = res.directory;
    }, err => {
      this.folders.loading = false;
      this.folders.error = true;
      // TODO: HANDLE ERROR
    });
  }
}
