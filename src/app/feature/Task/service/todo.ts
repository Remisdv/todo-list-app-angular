import { Injectable } from '@angular/core';
import { Task } from '../../../shared/model/Task';
import { CreateTaskDto } from '../../../shared/model/CreateTaskDto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskApiService } from '../../../core/service/task-api-service';
import { TaskStore } from './task.store';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasks$: Observable<Task[]>;

  constructor(
    private taskApiService: TaskApiService,
    private taskStore: TaskStore
  ) {
    this.tasks$ = this.taskStore.tasks$;
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskApiService.getAll().subscribe(tasks => {
      this.taskStore.setTask(tasks);
    });
  }

  getById(id: number): Observable<Task | undefined> {
    return this.tasks$.pipe(
      map(tasks => tasks.find(t => t.id === id))
    );
  }

  add(task: CreateTaskDto): void {
    this.taskApiService.create(task).subscribe({
      next: (newtask) => {
        console.log('Task created:', newtask);
        this.taskStore.add(newtask);
      },
      error: (err) => console.error('Error creating task:', err)
    });
  }

  updateTitle(id: number, title: string): void {
    this.taskApiService.update(id, { title }).subscribe(() => {
      this.taskStore.update(id, { title });
    });
  }

  toggleStatus(id: number): void {
    const task = this.taskStore.getTask(id);
    if (task) {
      const newCompleted = !task.completed;
      this.taskApiService.update(id, { completed: newCompleted }).subscribe(updatedTask => {
        if (updatedTask) {
          this.taskStore.update(id, { completed: updatedTask.completed });
        }
      });
    }
  }

  delete(id: number): void {
    this.taskApiService.delete(id).subscribe(() => {
      this.taskStore.remove(id);
    });
  }
}