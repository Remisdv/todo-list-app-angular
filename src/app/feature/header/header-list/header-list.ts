import { Component } from '@angular/core';
import { HeaderListTasks } from '../../todo/model/HeaderListTasks';
import { TaskStatus } from '../../todo/model/TaskStatus.enum';

@Component({
  selector: 'app-header-list',
  imports: [],  
  templateUrl: './header-list.html',
  styleUrl: './header-list.css',
})
export class HeaderList {
  tasks: HeaderListTasks[] = [

  ];
}