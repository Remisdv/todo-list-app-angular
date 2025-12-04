import { Routes } from '@angular/router';
import { App } from './app';
import { NewTaskPage } from './feature/todo/page/new-task-page/new-task-page';
import { TaskPage } from './feature/todo/page/task-page/task-page';
import { TaskDetailPage } from './feature/todo/page/task-detail-page/task-detail-page';

export const routes: Routes = [
    {
        path: 'tasks',
        component: TaskPage,
    },
    {
        path: 'tasks/new',
        component: NewTaskPage,
    },
    {
        path: 'tasks/:id',
        component: TaskDetailPage,
    }
];
