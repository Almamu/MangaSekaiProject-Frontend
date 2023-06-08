import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {ServerModel} from '../../../../models/server.model';
import RoutingService from '../../../../services/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userdata = {
    username: '',
    password: '',
    server: '',
  };

  constructor (private authentication: AuthenticationService, private router: Router, private routing: RoutingService) {

  }

  login () {
    // TODO: HANDLE ERRORS
    const server: ServerModel = {address: this.userdata.server, selected: true, alias: '', token: ''};

    // perform the login
    this.authentication.login (this.userdata.username, this.userdata.password, server).subscribe ((result) => {
      this.router.navigate ([this.routing.homePath ()], {replaceUrl: true});
    });
  }
}
