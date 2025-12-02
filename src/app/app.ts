import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderTitle } from './header-title/header-title';
import { TodoItem } from './todo-item/todo-item';
import { Task } from './todo-item/model/Task';
import { TodoService } from './services/todo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderTitle, TodoItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tasks: Task[] = [];

  constructor(private todoService: TodoService) {
    this.tasks = this.todoService.getAll();
  }

  onTaskClick(id: number): void {
    const success = this.todoService.toggleStatus(id);
    console.log('Toggle status:', id, success);
  }

  addTask(title: string): void {
    this.todoService.add({ title });
    // this.tasks = this.todoService.getAll();
  }

  deleteTask(id: number): void {
    this.todoService.delete(id);
  }

  updateTaskTitle(id: number, newTitle: string): void {
    this.todoService.updateTitle(id, newTitle);
  }
}