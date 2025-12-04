import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../feature/todo/model/Task';
import { CreateTaskDto } from '../../feature/todo/model/CreateTaskDto';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  // GET /api/tasks
  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // POST /api/tasks
  create(task: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // PUT /api/tasks/:id
  update(id: number, changes: Partial<Task>): Observable<Task | null> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, changes);
  }

  // PATCH /api/tasks/:id/toggle
  toggle(id: number): Observable<Task | null> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/toggle`, {});
  }

  // DELETE /api/tasks/:id
  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}