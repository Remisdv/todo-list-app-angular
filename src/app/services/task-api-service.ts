import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from '../todo-item/model/Task';
import { CreateTaskDto } from '../todo-item/model/CreateTaskDto';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private tasks: Task[] = [];

  constructor() {}

  // Simule GET /tasks
  getAll(): Observable<Task[]> {
    return of([...this.tasks]).pipe(delay(300));
  }

  // Simule POST /tasks
  create(task: CreateTaskDto): Observable<Task> {
    const newId = this.tasks.length > 0 
      ? Math.max(...this.tasks.map(t => t.id)) + 1 
      : 1;
    
    const newTask: Task = {
      id: newId,
      title: task.title,
      completed: false
    };
    
    this.tasks.push(newTask);
    return of(newTask).pipe(delay(300));
  }

  // Simule PUT /tasks/:id
  update(id: number, task: Partial<Task>): Observable<Task | null> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...task };
      return of(this.tasks[index]).pipe(delay(300));
    }
    return of(null).pipe(delay(300));
  }

  // Simule DELETE /tasks/:id
  delete(id: number): Observable<boolean> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }
}
