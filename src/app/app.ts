import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderList } from './header-list/header-list';
import { HeaderTitle } from './header-title/header-title';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderList, HeaderTitle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list-app');
}
