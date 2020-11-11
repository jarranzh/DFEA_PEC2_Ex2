import { Activity } from '../Models/activity';
export class User{
    id: number;
    name: string;
    surname: string;
    type: string;
    email: string;
    password: string;
    repeat_password: string;
    birthDate: string;
    phone: number;
    nationality: string;
    nif: string;
    aboutMe: string;
    companyName: string;
    companyDescription: string;
    cif: string;
    activities: Activity[];
    favorites: Activity[];
    education: Education[];
    languages: Languages[];
}

export class Education{
    type: string;
    level: string;
    name: string;
    university: string;
    finishDate: string;
}

export class Languages{
    level: string;
    language: string;
    finishDate: string;
}