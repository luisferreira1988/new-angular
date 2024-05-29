import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
  <div class="card">
  <div class="card-header">{{ title }}</div>
  <div class="card-body">{{ content }}</div>
  <div class="card-footer">{{ footer }}</div>
</div>
`,
  styleUrls: ['./card.component.css'],
  standalone: true,  // Make this a standalone component
})
export class CardComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() footer!: string;
}
