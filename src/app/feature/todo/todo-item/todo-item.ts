import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../model/Task';
import { TodoService } from '../services/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {

  tasks$: Observable<Task[]>;

  constructor(private todoService: TodoService) {
    this.tasks$ = this.todoService.tasks$;
  }
  
  @Input({ required: true }) task!: Task;
  @Output() buttonClick = new EventEmitter<number>();

  onButtonClick(): void {
    this.buttonClick.emit(this.task.id);
  }
  
  onDeleteClick(): void {
    this.todoService.delete(this.task.id);
  }
}