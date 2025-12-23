import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LoginForm } from '../../features/login-form/login-form';

@Component({
  selector: 'app-login-component',
  imports: [
    LoginForm,
    NzGridModule
  ],
  template: `
  <div class="container">
      <div class="login-form">
        <login-form/>
      </div>
  </div>

  `,
  styles: [
    `
    .container {
    background-color: #FFFFFF;
    }

  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
    `
  ]
})
export class LoginComponent {

}
