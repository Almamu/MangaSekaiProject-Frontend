import {Component, Input, OnInit} from '@angular/core';
import {SeriesModel} from '../../models/series.model';

@Component({
  selector: 'app-manga-cover',
  templateUrl: './manga-cover.component.html',
  styleUrls: ['./manga-cover.component.scss'],
})
export class MangaCoverComponent implements OnInit {

  @Input() manga: SeriesModel;
  @Input() subtitle: string;
  @Input() href: string;

  constructor () { }

  ngOnInit () {}

}
