import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSignal = signal<User[]>([]);

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/todos').pipe(
      tap((users) => this.usersSignal.set(users))
    );
  }

  get users$(): Signal<User[]> {
    return this.usersSignal;
  }

  setUsers(users: User[]) {
    this.usersSignal.set(users);
  }

  getUsers(): User[] {
    return this.usersSignal();
  }

  createUser(user: User) {
    const currentUsers = this.usersSignal();
    this.usersSignal.set([...currentUsers, user]);
  }
}
  /*


  updateUser(updatedUser: User) {
    const currentUsers = this.usersSignal().map(user =>
      user.name === updatedUser.name ? updatedUser : user
    );
    this.usersSignal.set(currentUsers);
  }

  deleteUser(userName: string) {
    const currentUsers = this.usersSignal().filter(user => user.name !== userName);
    this.usersSignal.set(currentUsers);
  }
  */

