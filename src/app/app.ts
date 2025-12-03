import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TodoItem } from './todo-item/todo-item';
import { Task } from './todo-item/model/Task';
import { TodoService } from './services/todo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoItem, AsyncPipe],
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

  addTask(title: string): void {
    this.todoService.add({ title });
  }

  deleteTask(id: number): void {
    this.todoService.delete(id);
  }

  updateTaskTitle(id: number, newTitle: string): void {
    this.todoService.updateTitle(id, newTitle);
  }
}