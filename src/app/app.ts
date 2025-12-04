import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TodoItem } from './feature/todo/todo-item/todo-item';
import { Task } from './feature/todo/model/Task';
import { TodoService } from './feature/todo/services/todo';
import { TaskForm } from './feature/todo/task-form/task-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoItem, AsyncPipe, TaskForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tasks$: Observable<Task[]>;

  constructor(private todoService: TodoService) {
    this.tasks$ = this.todoService.tasks$;
  }

  onTaskClick(id: number): void {
    this.todoService.toggleStatus(id);
    console.log('Toggle status:', id);
  }

  deleteTask(id: number): void {
    this.todoService.delete(id);
  }

  updateTaskTitle(id: number, newTitle: string): void {
    this.todoService.updateTitle(id, newTitle);
  }
}