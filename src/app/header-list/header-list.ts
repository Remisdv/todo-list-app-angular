import { Component } from '@angular/core';

@Component({
  selector: 'app-header-list',
  imports: [],
  templateUrl: './header-list.html',
  styleUrl: './header-list.css',
})
export class HeaderList {
  tasks = [
    { id: 1, title: 'Apprendre Angular', statut: "Terminé" },
    { id: 2, title: 'Construire une application Todo', statut: "En cours" },
    { id: 3, title: 'Tester l\'application', statut: "En attente" },
  ]

}
