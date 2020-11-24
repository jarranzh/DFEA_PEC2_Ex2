import { Activity } from 'src/app/activities/models/activity.model';

export class User {
  id: number;
  name: string;
  surname: string;
  type: string;
  email: string;
  password: string;
  repeatPassword: string;
  birthDate?: string;
  phone?: number;
  nationality?: string;
  nif?: string;
  aboutMe?: string;
  companyName?: string;
  companyDescription?: string;
  cif?: string;
  activities?: Activity[];
  favorites?: Activity[];
  education?: Education[];
  languages?: Language[];
}

export class Education {
  type: string;
  level: string;
  name: string;
  university: string;
  finishDate: string;
}

export class Language {
  level: string;
  language: string;
  finishDate: string;
}
