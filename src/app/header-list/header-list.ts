import { Component } from '@angular/core';
import { HeaderListTasks } from './model/HeaderListTasks';
import { TaskStatus } from './model/TaskStatus.enum';

@Component({
  selector: 'app-header-list',
  imports: [],
  templateUrl: './header-list.html',
  styleUrl: './header-list.css',
})
export class HeaderList {
  tasks: HeaderListTasks[] = [
    { id: 1, title: 'Apprendre Angular', statut: TaskStatus.COMPLETED },
    { id: 2, title: 'Construire une application Todo', statut: TaskStatus.IN_PROGRESS },
    { id: 3, title: "Tester l'application", statut: TaskStatus.PENDING },
  ];
}