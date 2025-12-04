import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoService } from '../../service/todo';
import { Task } from '../../../../shared/model/Task';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-detail-page',
  imports: [AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './task-detail-page.html',
  styleUrl: './task-detail-page.css',
})
export class TaskDetailPage implements OnInit {
  task$!: Observable<Task | undefined>;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.task$ = this.todoService.getById(id);
    }
  }
}
