import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User} from './../Models/user';
import { Activity } from './../Models/activity';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const users = [
      {
        id: 1,
        name: 'Tania',
        surname: 'Garcia',
        type: 'Company',
        email: 'taniag89@gmail.com',
        password: '12345678',
        repeat_password: '12345678',
        birthDate: '06/08/1989',
        phone: 660050478,
        nationality: 'ES',
        nif: '47855553N',
        aboutMe: 'M`encanten els gats',
        companyName: 'GAFO Click',
        companyDescription: 'Empresa de desenvolupament web',
        cif: 'B25845852',
        activities: [
          {
            id: 2,
            name: 'Sopa de Cabra',
            category: 'Cultura i patrimoni',
            subcategory: 'Concert',
            description: 'Concert de Sopa de Cabra al teatre l`Atlàntida de Vic',
            language: 'Català',
            date: '25/10/2020',
            price: 20,
            minCapacity: 20,
            limitCapacity: 100,
          state: 'Places available',
          peopleRegistered: 2
          },
          {
            id: 4,
        name: 'Museu Dalí',
        category: 'Cultura i patrimoni',
        subcategory: 'Museu',
        description: 'Visita al museu Dalí de Figueres',
        language: 'Castellà',
        date: '11/11/2020',
        price: 30,
        minCapacity: 5,
        limitCapacity: 9,
        state: 'Complete',
        peopleRegistered: 9
          }
        ],
        favorites: [],
        education: [
          {
          type: 'Títol Universitari',
          level: 'Grau',
          name: 'Infermeria',
          university: 'Universitat de Barcelona',
          finishDate: '28/06/2013'
        }
        ],
        languages: [
          {
            level: 'C1',
            language: 'Català',
            finishDate: '26/06/2007'
          },
          {
            level: 'C1',
            language: 'Castellà',
            finishDate: '26/06/2007'
          },
          {
            level: 'B2',
            language: 'Anglès',
            finishDate: '26/06/2007'
          }
        ]
    },
    {
        id: 2,
        name: 'Carla',
        surname: 'Font',
        type: 'Tourist',
        email: 'carla56@gmail.com',
        password: '12345678',
        repeat_password: '12345678',
        birthDate: '06/10/1993',
        phone: 646877730,
        nationality: 'ES',
        nif: '78545825N',
        aboutMe: 'Tinc molts animals',
        activities: [
        {
          id: 4,
          name: 'Museu Dalí',
          category: 'Cultura i patrimoni',
          subcategory: 'Museu',
          description: 'Visita al museu Dalí de Figueres',
          language: 'Castellà',
          date: '11/11/2020',
          price: 30,
          minCapacity: 5,
          limitCapacity: 9,
          state: 'Complete',
          peopleRegistered: 9
        }
        ],
        favorites: [],
        education: [
          {
          type: 'Títol Universitari',
          level: 'Grau',
          name: 'Farmàcia',
          university: 'Universitat de Barcelona',
          finishDate: '28/06/2017'
        }
        ],
        languages: [
          {
            level: 'C1',
            language: 'Català',
            finishDate: '26/06/2011'
          },
          {
            level: 'C1',
            language: 'Castellà',
            finishDate: '26/06/2011'
          },
          {
            level: 'B2',
            language: 'Anglès',
            finishDate: '26/06/2011'
          }
        ]
    },
    {
        id: 3,
        name: 'Aida',
        surname: 'Castro',
        type: 'Tourist',
        email: 'aida.ruiz@gmail.com',
        password: '12345678',
      repeat_password: '12345678',
      birthDate: '25/01/1960',
      phone: 627445560,
      nationality: 'ES',
      nif: '45875962P',
      aboutMe: 'M`agrada anar a la muntanya',
      activities: [
     {   id: 1,
        name: 'Bodega Torres',
        category: 'Enoturisme',
        subcategory: 'Bodega',
        description: 'Visita a la bodega Torres',
        language: 'Català',
        date: '11/10/2020',
        price: 25,
        minCapacity: 3,
        limitCapacity: 10,
        state: 'Places available',
        peopleRegistered: 3},
        {
          id: 4,
        name: 'Museu Dalí',
        category: 'Cultura i patrimoni',
        subcategory: 'Museu',
        description: 'Visita al museu Dalí de Figueres',
        language: 'Castellà',
        date: '11/11/2020',
        price: 30,
        minCapacity: 5,
        limitCapacity: 9,
        state: 'Complete',
        peopleRegistered: 9}
        ],
        favorites: [],
        education: [
          {
          type: 'Cicle Formatiu',
          level: 'Grau Mitjà',
          name: 'Gestió Administrativa',
          university: 'Institut Obert de Catalunya',
          finishDate: '28/06/2020'
        }
        ],
        languages: [
          {
            level: 'C1',
            language: 'Català',
            finishDate: '26/06/2006'
          },
          {
            level: 'C1',
            language: 'Castellà',
            finishDate: '26/06/2006'
          },
          {
            level: 'B1',
            language: 'Anglès',
            finishDate: '26/06/2006'
          }
        ]
    },
    {
        id: 4,
        name: 'Pilar',
        surname: 'Vila',
        type: 'Tourist',
        email: 'pilar62@gmail.com',
        password: '12345678',
      repeat_password: '12345678',
      birthDate: '24/04/1965',
      phone: 699856245,
      nationality: 'ES',
      nif: '77841524L',
      aboutMe: 'Em fa por anar en avió',
      activities: [
        {
          id: 2,
        name: 'Sopa de Cabra',
        category: 'Cultura i patrimoni',
        subcategory: 'Concert',
        description: 'Concert de Sopa de Cabra al teatre l`Atlàntida de Vic',
        language: 'Català',
        date: '25/10/2020',
        price: 20,
        minCapacity: 20,
        limitCapacity: 100,
      state: 'Places available',
      peopleRegistered: 2
        },
        {
          id: 4,
        name: 'Museu Dalí',
        category: 'Cultura i patrimoni',
        subcategory: 'Museu',
        description: 'Visita al museu Dalí de Figueres',
        language: 'Castellà',
        date: '11/11/2020',
        price: 30,
        minCapacity: 5,
        limitCapacity: 9,
        state: 'Complete',
        peopleRegistered: 9
        }
        ],
        favorites: [],
        education: [],
        languages: [
          {
            level: 'B2',
            language: 'Català',
            finishDate: '26/06/1993'
          },
          {
            level: 'B2',
            language: 'Castellà',
            finishDate: '26/06/1993'
          }
        ]
    },
    {
        id: 5,
        name: 'Ramon',
        surname: 'Garcia',
        type: 'Tourist',
        email: 'ramgarcia@gmail.com',
        password: '12345678',
      repeat_password: '12345678',
      birthDate: '11/08/1958',
      phone: 646774747,
      nationality: 'ES',
      nif: '41254789F',
      aboutMe: 'M`agraden molt els cotxes',
      activities: [
        {
          id: 4,
        name: 'Museu Dalí',
        category: 'Cultura i patrimoni',
        subcategory: 'Museu',
        description: 'Visita al museu Dalí de Figueres',
        language: 'Castellà',
        date: '11/11/2020',
        price: 30,
        minCapacity: 5,
        limitCapacity: 9,
        state: 'Complete',
        peopleRegistered: 9
        }
        ],
        favorites: [],
        education: [],
        languages: [
          {
            level: 'B1',
            language: 'Català',
            finishDate: '26/06/1995'
          },
          {
            level: 'B2',
            language: 'Castellà',
            finishDate: '26/06/1995'
          }
        ]
    },
    {
        id: 6,
        name: 'Kali',
        surname: 'Garcia',
        type: 'Tourist',
        email: 'kali@gmail.com',
        password: '12345678',
      repeat_password: '12345678',
      birthDate: '10/05/1996',
      phone: 678524125,
      nationality: 'ES',
      nif: '87574525N',
      aboutMe: 'Sóc del Barça',
      activities: [
        {
          id: 1,
          name: 'Bodega Torres',
          category: 'Enoturisme',
          subcategory: 'Bodega',
          description: 'Visita a la bodega Torres',
          language: 'Català',
          date: '11/10/2020',
          price: 25,
          minCapacity: 3,
          limitCapacity: 10,
          state: 'Places available',
          peopleRegistered: 3
        }
        ],
        favorites: [],
        education: [
          {
          type: 'Títol Universitari',
          level: 'Grau',
          name: 'Biologia',
          university: 'Universitat de Barcelona',
          finishDate: '28/06/2020'
        }
        ],
        languages: [
          {
            level: 'C1',
            language: 'Català',
            finishDate: '26/06/2018'
          },
          {
            level: 'C1',
            language: 'Castellà',
            finishDate: '26/06/2018'
          },
          {
            level: 'B2',
            language: 'Anglès',
            finishDate: '26/06/2018'
          }
        ]
    },
    {
        id: 7,
        name: 'Goku',
        surname: 'Castro',
        type: 'Tourist',
        email: 'goku@gmail.com',
        password: '12345678',
      repeat_password: '12345678',
      birthDate: '07/04/1994',
      phone: 647852730,
      nationality: 'ES',
      nif: '78553053K',
      aboutMe: 'M`agrada anar al cinema',
      activities: [
        {
          id: 1,
          name: 'Bodega Torres',
          category: 'Enoturisme',
          subcategory: 'Bodega',
          description: 'Visita a la bodega Torres',
          language: 'Català',
          date: '11/10/2020',
          price: 25,
          minCapacity: 3,
          limitCapacity: 10,
          state: 'Places available',
          peopleRegistered: 3
        }
        ],
        favorites: [],
        education: [
          {
          type: 'Cicle Formatiu',
          level: 'Grau Superior',
          name: 'Anatomia Patològica i Citologia',
          university: 'Escola Bonanova',
          finishDate: '28/06/2017'
        }
        ],
        languages: [
          {
            level: 'C1',
            language: 'Català',
            finishDate: '26/06/2015'
          },
          {
            level: 'C1',
            language: 'Castellà',
            finishDate: '26/06/2015'
          },
          {
            level: 'B2',
            language: 'Anglès',
            finishDate: '26/06/2015'
          }
        ]
    },
    {
        id: 8,
        name: 'Quim',
        surname: 'Roca',
        type: 'Company',
        email: 'quimrp@gmail.com',
        password: '12345678',
      repeat_password: '12345678',
      birthDate: '25/08/1988',
      phone: 699586238,
      nationality: 'FR',
      nif: '78954125G',
      aboutMe: 'Fem cultura',
      companyName: 'Tricatons',
        companyDescription: 'Empresa de pallassos',
        cif: 'B25874852',
      activities: [
        {
          id: 4,
        name: 'Museu Dalí',
        category: 'Cultura i patrimoni',
        subcategory: 'Museu',
        description: 'Visita al museu Dalí de Figueres',
        language: 'Castellà',
        date: '11/11/2020',
        price: 30,
        minCapacity: 5,
        limitCapacity: 9,
        state: 'Complete',
        peopleRegistered: 9
        }
        ],
        favorites: [],
        education: [],
        languages: []
    },
    {
        id: 9,
        name: 'Isona',
        surname: 'Fabrega',
        type: 'Tourist',
        email: 'ifabcl@gmail.com',
        password: '12345678',
      repeat_password: '12345678',
      birthDate: '07/12/2000',
      phone: 699857458,
      nationality: 'FR',
      nif: '77258051N',
      aboutMe: 'M`agrada viatjar',
      activities: [
        {
          id: 4,
        name: 'Museu Dalí',
        category: 'Cultura i patrimoni',
        subcategory: 'Museu',
        description: 'Visita al museu Dalí de Figueres',
        language: 'Castellà',
        date: '11/11/2020',
        price: 30,
        minCapacity: 5,
        limitCapacity: 9,
        state: 'Complete',
        peopleRegistered: 9
        }
        ],
        favorites: [],
        education: [],
        languages: []
    },
    {
        id: 10,
        name: 'Jofre',
        surname: 'Cano',
        type: 'Tourist',
        email: 'jcGil9@gmail.com',
        password: '12345678',
      repeat_password: '12345678',
      birthDate: '06/08/1987',
      phone: 627855560,
      nationality: 'ES',
      nif: '78954120Q',
      aboutMe: 'Sóc treballador.',
      activities: [
        {
          id: 3,
          name: 'Platja del Castell',
          category: 'Platges',
          subcategory: 'Cala',
          description: 'Estada a la Platja del Castell',
          language: 'Anglès',
          date: '31/12/2020',
          price: 15,
          minCapacity: 10,
          limitCapacity: 65,
        state: 'Places available',
        peopleRegistered: 1
        },
        {
          id: 4,
        name: 'Museu Dalí',
        category: 'Cultura i patrimoni',
        subcategory: 'Museu',
        description: 'Visita al museu Dalí de Figueres',
        language: 'Castellà',
        date: '11/11/2020',
        price: 30,
        minCapacity: 5,
        limitCapacity: 9,
        state: 'Complete',
        peopleRegistered: 9
        }
        ],
        favorites: [],
        education: [],
        languages: []
    }
    ];
    const activities = [
      {
        id: 1,
        name: 'Bodega Torres',
        category: 'Enoturisme',
        subcategory: 'Bodega',
        description: 'Visita a la bodega Torres',
        language: 'Català',
        date: '11/10/2020',
        price: 25,
        minCapacity: 3,
        limitCapacity: 10,
        state: 'Places available',
        peopleRegistered: 3
    },
    {
        id: 2,
        name: 'Sopa de Cabra',
        category: 'Cultura i patrimoni',
        subcategory: 'Concert',
        description: 'Concert de Sopa de Cabra al teatre l`Atlàntida de Vic',
        language: 'Català',
        date: '25/10/2020',
        price: 20,
        minCapacity: 20,
        limitCapacity: 100,
      state: 'Places available',
      peopleRegistered: 2
    },
    {
        id: 3,
        name: 'Platja del Castell',
        category: 'Platges',
        subcategory: 'Cala',
        description: 'Estada a la Platja del Castell',
        language: 'Anglès',
        date: '31/12/2020',
        price: 15,
        minCapacity: 10,
        limitCapacity: 65,
      state: 'Places available',
      peopleRegistered: 64
    },
    {
        id: 4,
        name: 'Museu Dalí',
        category: 'Cultura i patrimoni',
        subcategory: 'Museu',
        description: 'Visita al museu Dalí de Figueres',
        language: 'Castellà',
        date: '11/11/2020',
        price: 30,
        minCapacity: 5,
        limitCapacity: 9,
        state: 'Complete',
        peopleRegistered: 9
      },
      {
        id: 5,
        name: 'Aquarium',
        category: 'Cultura i patrimoni',
        subcategory: 'Visita guiada',
        description: 'Visita a l`Aquàrium de Barcelona',
        language: 'Francès',
        date: '11/10/2020',
        price: 20,
        minCapacity: 5,
        limitCapacity: 15,
        state: 'Cancelled',
        peopleRegistered: 2
    }
    ];
    return {users, activities}
  }

  userId(users: User[]): number{
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }

  activityId(activities: Activity[]): number{
    return activities.length > 0 ? Math.max(...activities.map(activity => activity.id)) + 1 : 1;
  }

}
