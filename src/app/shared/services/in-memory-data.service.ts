import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IUser } from '../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, name: 'Mr. Nice', age: 20, city: 'New York' },
      { id: 12, name: 'Narco', age: 21, city: 'Tokyo'  },
      { id: 13, name: 'Bombasto', age: 22, city: 'Rome'  },
      { id: 14, name: 'Celeritas', age: 23, city: 'Athenes'  },
      { id: 15, name: 'Magneta', age: 24, city: 'Sao Paulo'  },
      { id: 16, name: 'RubberMan', age: 25, city: 'Chigaco' },
      { id: 17, name: 'Dynama', age: 26, city: 'Amesterdam'  },
      { id: 18, name: 'Dr IQ', age: 27, city: 'London'  },
      { id: 19, name: 'Magma', age: 28, city: 'Paris'  },
      { id: 20, name: 'Tornado', age: 29, city: 'Berlin'  }
    ];
    return {users};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: IUser[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
