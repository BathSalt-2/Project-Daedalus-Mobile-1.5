import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <StackLayout class="loading-container">
      <ActivityIndicator [busy]="true" class="activity-indicator"></ActivityIndicator>
      <Label [text]="message" class="loading-text"></Label>
    </StackLayout>
  `,
  styles: [`
    .loading-container {
      align-items: center;
      justify-content: center;
      padding: 20;
    }
    .loading-text {
      margin-top: 10;
      color: #666;
    }
  `]
})
export class LoadingComponent {
  @Input() message: string = 'Loading...';
}