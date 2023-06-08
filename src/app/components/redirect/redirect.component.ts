import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import RoutingService from '../../services/routing.service';

@Component({
  template: '',
  selector: 'app-redirect'
})
export default class RedirectComponent implements OnInit {
  constructor (private router: Router, private routing: RoutingService) {}

  ngOnInit (): void {
    this.router.navigate ([this.routing.homePath ()], {replaceUrl: true});
  }
}
