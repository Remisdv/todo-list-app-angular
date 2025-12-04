import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TodoService } from '../services/todo';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('')
  });

  constructor(private todoService: TodoService) {}

  onSubmit(): void {
    if (this.taskForm.invalid) {
      console.log('Form is invalid');
      this.taskForm.reset();
      return;
    }
    const taskTitle = this.taskForm.value.title;
    const taskDescription = this.taskForm.value.description;
    
    if (taskTitle) {
      this.todoService.add({ 
        title: taskTitle, 
        description: taskDescription || undefined 
      });
      this.taskForm.reset();
    }
  }
}
