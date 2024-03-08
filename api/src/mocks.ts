import { Pastry } from './pastry';
import { User, Status } from './user';

export const PASTRIES: Pastry[] = [
    {
        "id": "1",
        "name": "Fondant supreme",
        "image": "http://placehold.it/32x32",
        "quantity": 4,
        "quantityWon" : 0,
        "choice": false
    },
    {
        "id": "2",
        "name": "Cake tout Chocolat",
        "image": "http://placehold.it/32x32",
        "quantity": 3,
        "quantityWon" : 0,
        "choice": false
    },
    {
        "id": "3",
        "name": "Cake Framboise chocolat",
        "image": "http://placehold.it/32x32",
        "quantity": 4,
        "quantityWon" : 0,
        "choice": false
    },
    {
        "id": "4",
        "name": "Brioche sucrée avec chocolat",
        "image": "http://placehold.it/32x32",
        "quantityWon" : 0,
        "quantity": 3,
        "choice": false
    },
    {
        "id": "5",
        "name": "Cake glacé fondant au chocolat",
        "image": "http://placehold.it/32x32",
        "quantity": 2,
        "quantityWon" : 0,
        "choice": false
    },
    {
        "id": "6",
        "name": "Eclairs au chocolat",
        "image": "http://placehold.it/32x32",
        "quantity": 5,
        "quantityWon" : 0,
        "choice": false
    },
    {
        "id": "7",
        "name": "Tarte poire chocolat",
        "image": "http://placehold.it/32x32",
        "quantity": 5,
        "quantityWon" : 0,
        "choice": false
    },
    {
        "id": "8",
        "name": "Banana au chocolat",
        "image": "http://placehold.it/32x32",
        "quantity": 3,
        "quantityWon" : 0,
        "choice": false
    }
];

export const USERS: User[] = [
  {
    "id": "1",
    "name": "Alice",
    "email": "alice@alice.fr",
    "password": "$2b$10$9qnYoc6ZySrdeLRdakm3p.6lksaaMRV/4G0pyRlaCnz4Gto10QH6S", // alice
    "status": Status.Offline,
  },
  {
    "id": "2",
    "name": "Bob",
    "email": "bob@bob.fr",
    "password": "$2b$10$2RJ..7EfjLt5ib6CsswP9.ytmfoGTGfgL5LhF6C3n.IBgexqWkH5q", // bob
    "status": Status.Offline,
  }
];