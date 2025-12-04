import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  private taskSubject = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.taskSubject.asObservable();

  setTask(tasks: Task[]): void {
    this.taskSubject.next(tasks);
  }

  getTask(id: number): Task | undefined {
    return this.taskSubject.getValue().find(t => t.id === id);
  }

  add(task: Task): void {
    const currentTasks = this.taskSubject.getValue();
    console.log('Current Tasks:', task);
    this.taskSubject.next([...currentTasks, task]);
  }

  update(id: number, changes: Partial<Task>): void {
    const currentTasks = this.taskSubject.getValue();
    const updatedTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, ...changes } : task
    );
    this.taskSubject.next(updatedTasks);
  }

  remove(id: number): void {
    const currentTasks = this.taskSubject.getValue();
    const updatedTasks = currentTasks.filter((task) => task.id !== id);
    this.taskSubject.next(updatedTasks);
  }
}
