import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { UsersService } from './services/users.service';
import { provideHttpClient } from '@angular/common/http';

export interface User {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <button (click)="handleClick()">Add User</button>
  <button (click)="updateUser()">Update User</button>
  <button (click)="deleteUser()">Delete User</button>
    @for (user of users; track user) { 
      {{user.title}}
    } 
   @empty { 
    <div>No users on database</div> 
   }
  `,
})
export class App {
  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.fetchUsers().subscribe((users) => {
      this.users = users;
    });
    this.usersService.getUsers();
  }

  /*
  handleClick() {
    const newUser: User = {
      name: 'New User',
      age: 20,
      sex: 'Masculine',
    };
    this.usersService.createUser(newUser);
    this.users = this.usersService.getUsers();
  }

  updateUser() {
    const updatedUser: User = {
      name: 'John',
      age: 17,
      sex: 'Masculine',
    };
    this.usersService.updateUser(updatedUser);
    this.users = this.usersService.getUsers();
  }

  deleteUser() {
    this.usersService.deleteUser('Maria');
    this.users = this.usersService.getUsers();
  }
  */

  trackByUser(index: number, user: User): number {
    return user.id;
  }
}

bootstrapApplication(App, {
  providers: [provideHttpClient(),provideExperimentalZonelessChangeDetection()],
});
