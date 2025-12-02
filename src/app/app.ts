import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderTitle } from './header-title/header-title';
import { TodoItem } from './todo-item/todo-item';
import { Task } from './todo-item/model/Task';
import { TaskStatus } from './todo-item/model/TaskStatus.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderTitle, TodoItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tasks: Task[] = [
    { id: 1, title: 'Apprendre Angular', statut: TaskStatus.COMPLETED },
    { id: 2, title: 'Construire une application Todo', statut: TaskStatus.IN_PROGRESS },
    { id: 3, title: "Tester l'application", statut: TaskStatus.PENDING },
  ];

  onTaskClick(id: number): void {
    console.log('Tâche cliquée:', id);
  }
}