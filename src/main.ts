import {
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { User, Users } from './components/users.component';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button (click)="handleClick()">emit data to child</button>
    <!--
    <app-users (dataToParent)="dataFromChild($event)"  [data]="data" />
    @for (user of users; track user) { 
      {{user.name}}
    } 
   @empty { 
    <div>No users on database</div> 
   }
  -->
   `,
  imports: [Users],
})
export class App {
  data: any = {
    name: 'Name',
    age: 15,
    sex: 'Masculine',
  };
  users: User[] = [
    { name: 'John', age: 15, sex: 'feminie' },
    { name: 'Maria', age: 16, sex: 'feminie' },
  ];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.setUsers(this.users);
    this.usersService.getUsers();
  }

  handleClick() {
    this.users.push({
      name: 'Name',
      age: 15,
      sex: 'Masculine',
    });
    this.usersService.setUsers(this.users);
  }

  dataFromChild(event: any) {
    console.log(event);
    this.users.push(event);
    console.log(this.users);
  }
}

bootstrapApplication(App, {
  providers: [provideExperimentalZonelessChangeDetection()],
});
