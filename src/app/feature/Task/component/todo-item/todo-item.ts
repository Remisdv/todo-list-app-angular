import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../shared/model/Task';
import { TodoService } from '../../service/todo';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  imports: [RouterLink],
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