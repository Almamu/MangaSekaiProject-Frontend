import {Component, OnInit} from '@angular/core';
import RoutingService from '../../../../services/routing.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export default class LogoutComponent implements OnInit {
  constructor (private router: Router, private routing: RoutingService, private auth: AuthenticationService) {

  }

  ngOnInit (): void {
    this.auth.logout ();
    this.router.navigate([this.routing.homePath ()]);
  }
}
