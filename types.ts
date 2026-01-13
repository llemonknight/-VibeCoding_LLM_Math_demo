
export interface DataPoint {
  x: number;
  y: number;
}

export enum ActivationType {
  LINEAR = 'Linear',
  RELU = 'ReLU',
  GELU = 'GeLU'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
