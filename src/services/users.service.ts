import { Injectable, signal, computed, Signal } from '@angular/core';
import { User } from '../components/users.component';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSignal = signal<User[]>([]);

  get users$(): Signal<User[]> {
    return this.usersSignal;
  }

  setUsers(users: User[]) {
    this.usersSignal.set(users);
  }

  getUsers(): User[] {
    return this.usersSignal();
  }
}
