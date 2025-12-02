import { Component } from '@angular/core';

@Component({
  selector: 'app-header-title',
  imports: [],
  templateUrl: './header-title.html',
  styleUrl: './header-title.css',
})
export class HeaderTitle {
  Title = 'Gestion des taches';
  TitleDescription = 'Bienvenue dans votre application de gestion des taches !';
}
