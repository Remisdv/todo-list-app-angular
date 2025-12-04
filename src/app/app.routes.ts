import { Routes } from '@angular/router';
import { TaskForm } from './feature/Task/component/task-form/task-form';
import { TaskPage } from './feature/Task/task-page';
import { TaskDetailPage } from './feature/Task/component/task-detail/task-detail-page';

export const routes: Routes = [
    {
        path: 'tasks',
        component: TaskPage,
    },
    {
        path: 'tasks/new',
        component: TaskForm,
    },
    {
        path: 'tasks/:id',
        component: TaskDetailPage,
    },
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    }
];
