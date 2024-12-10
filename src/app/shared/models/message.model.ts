export interface Message {
  text: string;
  timestamp: number;
  senderId: string;
  isAiResponse: boolean;
}