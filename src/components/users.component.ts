import { Component, OnInit, input, output } from '@angular/core';
import { UsersService } from '../services/users.service';

export interface User {
  name: string;
  age: number;
  sex: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  template: `
  <h1>hello {{data()?.name}}</h1>
  <button (click)="handleClick()">emit data to parent</button>
  @for (user of usersSignal(); track user) { 
      {{user.name}}
    } 
   @empty { 
    <div>No users on database</div> 
   }
  `,
})
export class Users implements OnInit {
  data = input<User>();
  dataToParent = output<User>();
  usersSignal = this.usersService.users$;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    // The signal will automatically update the view when the state changes.
    console.log(this.usersSignal());
  }

  handleClick() {
    this.dataToParent.emit({
      name: 'Uuser added',
      age: 20,
      sex: 'FEMININE',
    });
  }
}
