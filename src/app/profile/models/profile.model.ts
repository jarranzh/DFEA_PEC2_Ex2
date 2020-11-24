import { Activity } from 'src/app/activities/models/activity.model';

export class Profile {
  name: string;
  surname: string;
  type: string;
  birthDate: string;
  phone: number;
  nationality: string;
  nif: string;
  aboutMe: string;
  companyName?: string;
  companyDescription?: string;
  cif?: string;
  activities: Activity[];
}
