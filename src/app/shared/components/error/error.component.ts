import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <StackLayout class="error-container">
      <Label [text]="message" class="error-text"></Label>
      <Button text="Retry" (tap)="onRetry.emit()" class="retry-button"></Button>
    </StackLayout>
  `,
  styles: [`
    .error-container {
      align-items: center;
      justify-content: center;
      padding: 20;
    }
    .error-text {
      color: #dc3545;
      margin-bottom: 10;
    }
    .retry-button {
      background-color: #007bff;
      color: white;
      padding: 10 20;
      border-radius: 5;
    }
  `]
})
export class ErrorComponent {
  @Input() message: string = 'An error occurred';
  @Output() onRetry = new EventEmitter<void>();
}