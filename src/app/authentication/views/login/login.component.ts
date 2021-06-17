import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userdata = {
    username: '',
    password: ''
  };

  constructor (private authentication: AuthenticationService, private router: Router) { }

  login () {
    // TODO: HANDLE ERRORS
    this.authentication.login (this.userdata.username, this.userdata.password).subscribe ((result) => {
      this.router.navigate (['dashboard']);
    });
  }
}
