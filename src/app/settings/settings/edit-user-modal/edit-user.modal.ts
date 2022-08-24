import {Component, ViewChild} from '@angular/core';
import {AlertController, IonAccordionGroup, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user.modal.html'
})
export class EditUserModal {
  public username: string;
  public password: string;
  public confirmPassword: string;
  @ViewChild ('accordionGroup') accordionGroup: IonAccordionGroup;

  constructor (
    private modal: ModalController,
    private alert: AlertController
  ) { }

  async confirm () {
    let value: Record <string, string> = {username: this.username};

    if (this.accordionGroup.value === 'newPassword') {
      // ensure passwords match
      if (this.password !== this.confirmPassword) {
        const errorAlert = await this.alert.create ({
          header: 'Error',
          message: 'Passwords do not match',
          buttons: ['OK']
        });

        errorAlert.present ();
        return;
      }

      value = {...value, password: this.password};
    }

    this.modal.dismiss (value, 'okay');
  }

  cancel (): void {
    this.modal.dismiss (null, 'cancel');
  }
}
