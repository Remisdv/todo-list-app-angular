import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../model/Task';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  @Input({ required: true }) task!: Task;
  @Output() buttonClick = new EventEmitter<number>();

  onButtonClick(): void {
    this.buttonClick.emit(this.task.id);
  }
}