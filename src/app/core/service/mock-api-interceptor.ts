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
  private static tasks: Task[] = [
    { id: 1, title: 'Apprendre Angular', completed: true },
    { id: 2, title: 'Construire une application Todo', completed: false },
    { id: 3, title: "Tester l'application", completed: false }
  ];
  private static nextId = 4;

  private extractId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1], 10);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = req;

    // GET /api/tasks
    if (url === '/api/tasks' && method === 'GET') {
      return of(new HttpResponse({ status: 200, body: [...MockApiInterceptor.tasks] })).pipe(delay(300));
    }

    // POST /api/tasks
    if (url === '/api/tasks' && method === 'POST') {
      const newTask: Task = {
        id: MockApiInterceptor.nextId++,
        title: body.title,
        description: body.description,
        completed: false
      };
      MockApiInterceptor.tasks.push(newTask);
      return of(new HttpResponse({ status: 201, body: newTask })).pipe(delay(300));
    }

    // PATCH /api/tasks/:id
    if (url.startsWith('/api/tasks/') && method === 'PATCH') {
      const id = this.extractId(url);
      const index = MockApiInterceptor.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        MockApiInterceptor.tasks[index] = { ...MockApiInterceptor.tasks[index], ...body };
        return of(new HttpResponse({ status: 200, body: MockApiInterceptor.tasks[index] })).pipe(delay(300));
      }
      return of(new HttpResponse({ status: 404, body: null })).pipe(delay(300));
    }

    // DELETE /api/tasks/:id
    if (url.startsWith('/api/tasks/') && method === 'DELETE') {
      const id = this.extractId(url);
      const index = MockApiInterceptor.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        MockApiInterceptor.tasks.splice(index, 1);
        return of(new HttpResponse({ status: 200, body: true })).pipe(delay(300));
      }
      return of(new HttpResponse({ status: 404, body: false })).pipe(delay(300));
    }

    return next.handle(req);
  }
}