import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from '../../feature/todo/model/Task';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  private tasks: Task[] = [];
  private nextId = 1;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = req;

    // GET /api/tasks
    if (url === '/api/tasks' && method === 'GET') {
      return of(new HttpResponse({ status: 200, body: [...this.tasks] })).pipe(delay(300));
    }

    // POST /api/tasks
    if (url === '/api/tasks' && method === 'POST') {
      const newTask: Task = {
        id: this.nextId++,
        title: body.title,
        completed: false
      };
      this.tasks.push(newTask);
      return of(new HttpResponse({ status: 201, body: newTask })).pipe(delay(300));
    }

    // PUT /api/tasks/:id
    if (url.startsWith('/api/tasks/') && !url.includes('/toggle') && method === 'PUT') {
      const id = this.extractId(url);
      const index = this.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...body };
        return of(new HttpResponse({ status: 200, body: this.tasks[index] })).pipe(delay(300));
      }
      return of(new HttpResponse({ status: 404, body: null })).pipe(delay(300));
    }

    // PATCH /api/tasks/:id/toggle
    if (url.startsWith('/api/tasks/') && url.endsWith('/toggle') && method === 'PATCH') {
      const id = this.extractId(url.replace('/toggle', ''));
      const index = this.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        this.tasks[index].completed = !this.tasks[index].completed;
        return of(new HttpResponse({ status: 200, body: this.tasks[index] })).pipe(delay(300));
      }
      return of(new HttpResponse({ status: 404, body: null })).pipe(delay(300));
    }

    // DELETE /api/tasks/:id
    if (url.startsWith('/api/tasks/') && method === 'DELETE') {
      const id = this.extractId(url);
      const index = this.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        return of(new HttpResponse({ status: 200, body: true })).pipe(delay(300));
      }
      return of(new HttpResponse({ status: 404, body: false })).pipe(delay(300));
    }

    return next.handle(req);
  }

  private extractId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1], 10);
  }
}