import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TodoService } from '../../services/todo';
import { requiredAndMinLengthValidator, bannedWordsValidator } from '../../../../shared/validators/custom-validators';


@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  taskForm = new FormGroup({
    title: new FormControl('', [
      requiredAndMinLengthValidator(3),
      bannedWordsValidator(['spam', 'interdit', 'test']) 
    ]),
    description: new FormControl('')
  });

  constructor(private todoService: TodoService) {}

  onSubmit(): void {
    if (this.taskForm.invalid) {
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
