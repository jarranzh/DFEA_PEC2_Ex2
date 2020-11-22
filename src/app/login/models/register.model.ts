import { User } from 'src/app/profile/models/user.model';

export class Registration {
  name: User['name'];
  surname: User['surname'];
  userType: User['type'];
  email: User['email'];
  password: User['password'];
  repeatPassword: User['repeatPassword'];
}
