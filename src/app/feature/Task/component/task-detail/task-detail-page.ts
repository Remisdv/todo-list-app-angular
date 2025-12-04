import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoService } from '../../service/todo';
import { Task } from '../../../../shared/model/Task';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-detail-page',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './task-detail-page.html',
  styleUrl: './task-detail-page.css',
})
export class TaskDetailPage {

}
