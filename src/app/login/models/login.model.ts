import { User } from 'src/app/profile/models/user.model';

export class Login {
  userEmail: User['email'];
  userPassword: User['password'];

  constructor(userEmail: User['email'], userPassword: User['password']) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }
}
