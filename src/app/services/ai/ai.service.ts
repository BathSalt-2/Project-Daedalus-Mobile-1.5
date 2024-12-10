import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  async generateResponse(prompt: string): Promise<string> {
    // TODO: Implement actual AI integration
    return `AI response to: ${prompt}`;
  }

  streamResponse(prompt: string): Observable<string> {
    return from(this.generateResponse(prompt));
  }
}