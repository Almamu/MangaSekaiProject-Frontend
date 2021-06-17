import {StaffModel} from './staff.model';
import {GenreModel} from './genre.model';

export interface SeriesModel {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Id: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Name: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ChapterCount: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    PagesCount: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Description: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Synced: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Image: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Path: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Authors: StaffModel[];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Genres: GenreModel[];
}
