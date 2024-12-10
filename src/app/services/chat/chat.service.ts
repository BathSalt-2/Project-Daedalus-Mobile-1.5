import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-database';
import { Message } from '../../shared/models/message.model';
import { getCurrentUserId } from '../../shared/utils/firebase.utils';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$: Observable<Message[]> = this.messagesSubject.asObservable();

  constructor() {
    this.initializeMessageListener();
  }

  private initializeMessageListener(): void {
    firebase()
      .database()
      .ref('messages')
      .orderByChild('timestamp')
      .on('value', snapshot => {
        const messages: Message[] = [];
        snapshot.forEach(child => {
          messages.push({
            ...child.val(),
            id: child.key
          });
          return false;
        });
        this.messagesSubject.next(messages.reverse());
      });
  }

  async sendMessage(text: string, isAiResponse = false): Promise<void> {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('User must be authenticated to send messages');
    }

    const message: Message = {
      text,
      timestamp: Date.now(),
      senderId: userId,
      isAiResponse
    };

    await firebase().database().ref('messages').push(message);
  }

  async deleteMessage(messageId: string): Promise<void> {
    await firebase().database().ref(`messages/${messageId}`).remove();
  }
}