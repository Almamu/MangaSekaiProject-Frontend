import {Component, Input, OnInit} from '@angular/core';
import {SeriesModel} from '../../../models/series.model';

@Component({
  selector: 'app-chapter-cover',
  templateUrl: './chapter-cover.component.html',
  styleUrls: ['./chapter-cover.component.scss'],
})
export class ChapterCoverComponent implements OnInit {

  @Input() manga: SeriesModel;
  @Input() title: string;
  @Input() href: string;

  constructor () { }

  ngOnInit () {}

}
