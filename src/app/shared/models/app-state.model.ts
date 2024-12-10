import { User } from '../../services/auth/auth.service';
import { Message } from './message.model';
import { Project } from './project.model';

export interface AppState {
  auth: {
    user: User | null;
    loading: boolean;
    error: string | null;
  };
  chat: {
    messages: Message[];
    loading: boolean;
    error: string | null;
  };
  projects: {
    items: Project[];
    loading: boolean;
    error: string | null;
  };
}