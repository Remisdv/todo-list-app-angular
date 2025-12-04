import { Component } from '@angular/core';
import { TaskForm } from '../../component/task-form/task-form';

@Component({
  selector: 'app-new-task-page',
  imports: [TaskForm],
  templateUrl: './new-task-page.html',
  styleUrl: './new-task-page.css',
})
export class NewTaskPage {

}
