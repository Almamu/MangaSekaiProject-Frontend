import {FileModel} from './file.model';

export interface DirectoryListModel {
  directory: string;
  contents: FileModel [];
}
