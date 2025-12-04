import { Component } from '@angular/core';
import { TodoItem } from '../../component/todo-item/todo-item';
import { Observable } from 'rxjs';
import { Task } from '../../model/Task';
import { TodoService } from '../../services/todo';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-page',
  imports: [CommonModule, TodoItem, RouterLink],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage {
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
