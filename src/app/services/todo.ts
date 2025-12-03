import { Injectable } from '@angular/core';
import { Task } from '../todo-item/model/Task';
import { CreateTaskDto } from '../todo-item/model/CreateTaskDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskApiService } from './task-api-service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor(private taskApiService: TaskApiService) {
    this.taskApiService.create({ title: 'Apprendre Angular' }).subscribe();
    this.taskApiService.create({ title: 'Construire une application Todo' }).subscribe();
    this.taskApiService.create({ title: "Tester l'application" }).subscribe(() => {
      this.loadTasks();
    });
  }

  loadTasks(): void {
    this.taskApiService.getAll().subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }

  add(task: CreateTaskDto): void {
    this.taskApiService.create(task).subscribe(() => {
      this.loadTasks();
    });
  }

  updateTitle(id: number, title: string): void {
    this.taskApiService.update(id, { title }).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleStatus(id: number): void {
    this.taskApiService.getAll().subscribe(tasks => {
      const task = tasks.find(t => t.id === id);
      if (task) {
        this.taskApiService.update(id, { completed: !task.completed }).subscribe(() => {
          this.loadTasks();
        });
      }
    });
  }

  delete(id: number): void {
    this.taskApiService.delete(id).subscribe(() => {
      this.loadTasks();
    });
  }
}