import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderList } from './header-list/header-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list-app');
}
