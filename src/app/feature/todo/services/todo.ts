import { Injectable } from '@angular/core';
import { Task } from '../model/Task';
import { CreateTaskDto } from '../model/CreateTaskDto';
import { Observable } from 'rxjs';
import { TaskApiService } from './task-api-service';
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
    this.taskApiService.create({ title: 'Apprendre Angular' }).subscribe();
    this.taskApiService.create({ title: 'Construire une application Todo' }).subscribe();
    this.taskApiService.create({ title: "Tester l'application" }).subscribe(() => {
      this.loadTasks();
    });
  }

  loadTasks(): void {
    this.taskApiService.getAll().subscribe(tasks => {
      this.taskStore.setTask(tasks);
    });
  }

  add(task: CreateTaskDto): void {
    this.taskApiService.create(task).subscribe(newtask => {
      this.taskStore.add(newtask);
    });
  }

  updateTitle(id: number, title: string): void {
    this.taskApiService.update(id, { title }).subscribe(() => {
      this.taskStore.update(id, { title });
    });
  }

  toggleStatus(id: number): void {
    this.taskApiService.toggle(id).subscribe(updatedTask => {
      if (updatedTask) {
        this.taskStore.update(id, { completed: updatedTask.completed });
      }
    });
  }

  delete(id: number): void {
    this.taskApiService.delete(id).subscribe(() => {
      this.taskStore.remove(id);
    });
  }
}