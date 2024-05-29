import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
  <button>{{label}}</button>
`,
  styleUrls: ['./button.component.css'],
  standalone: true,  // Make this a standalone component
})
export class ButtonComponent {
  @Input() label!: string;
}
