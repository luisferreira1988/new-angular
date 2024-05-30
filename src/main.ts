import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { UsersService } from './services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { CardComponent, ButtonComponent } from './shared/components';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div *ngIf="isLoading; else isFinishLoading">
    loading
    </div>

    <ng-template #isFinishLoading>
      <div >
      asd
      </div>
    </ng-template>
  `,
  imports: [CardComponent, ButtonComponent, NgIf]
})
export class App {
  usersSignal = this.usersService.users$;
  buttonLabel: string = '';
  isLoading: boolean = true;  // Initially set to true

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.isLoading = true;  // Ensure loading state is true at the start
    this.usersService.fetchUsers().subscribe({
      next: (value) => {
        console.log(value);
        this.isLoading = false;  // Set to false once data is fetched
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;  // Set to false in case of error
      }
    });
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

  trackByUser(index: number, user: User): number {
    return user.id;
  }
}

bootstrapApplication(App, {
  providers: [provideHttpClient(), provideExperimentalZonelessChangeDetection()],
});
