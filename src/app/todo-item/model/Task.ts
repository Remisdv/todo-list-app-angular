import { TaskStatus } from './TaskStatus.enum';

export interface Task {
  id: number;
  title: string;
  statut: TaskStatus;
}