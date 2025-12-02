import { Injectable } from '@angular/core';
import { Task } from '../todo-item/model/Task';
import { CreateTaskDto } from '../todo-item/model/CreateTaskDto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private tasks: Task[] = [];

  constructor() {
    this.add({ title: 'Apprendre Angular' });
    this.add({ title: 'Construire une application Todo' });
    this.add({ title: "Tester l'application" });
  }

  getAll(): Task[] {
    return [...this.tasks];
    // return this.tasks;
  }

  add(task: CreateTaskDto): void {
    const newId = this.tasks.length > 0 
      ? Math.max(...this.tasks.map(t => t.id)) + 1 
      : 1;
    
    this.tasks.push({
      id: newId,
      title: task.title,
      completed: false
    });
  }

  updateTitle(id: number, title: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.title = title;
    }
  }

  toggleStatus(id: number): boolean {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      return true;
    }
    return false;
  }

  delete(id: number): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}