import { TaskStatus } from './TaskStatus.enum';

export interface HeaderListTasks {
  id: number;
  title: string;
  statut: TaskStatus;
}