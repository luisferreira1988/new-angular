import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { UsersService } from './services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { CardComponent , ButtonComponent } from './shared/components';


@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <div>
  <app-button label="kakaa"  />
  <app-card title="kakaa" content="asdasd" footer="asd" />
  <button (click)="handleClick()">CREATE USER</button>
    @for (user of usersSignal(); track user) { 
      {{user.title}}
    } 
    @empty { 
      <div>No users on database</div> 
     }
    </div>
  `,
  imports: [CardComponent, ButtonComponent]
})
export class App {
  usersSignal = this.usersService.users$;
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.fetchUsers().subscribe();
    //this.usersService.getUsers();
    //this.usersService.getUsers();
  }

 
  handleClick() {
    const newUser: User = {
      title: 'New User',
      userId: 11111111111,
      id: 123321123321,
      completed: true
    };
    this.usersService.createUser(newUser);
  }
 /*
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
