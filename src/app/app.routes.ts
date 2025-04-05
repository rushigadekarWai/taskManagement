import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { TaskListComponent } from "./tasks/task-list/task-list.component";
import { TaskFormComponent } from "./tasks/task-form/task-form.component";
import { LayoutComponent } from "./tasks/layout/layout.component";
import { ProjectsComponent } from "./tasks/projects/projects.component";
import { authGuard } from "./auth/auth.guard";
import { HomeComponent } from "./tasks/home/home.component";
import { ProjectformComponent } from "./tasks/projectform/projectform.component";
import { UsersListComponent } from "./pages/users-list/users-list.component";
import { ProjectsListComponent } from "./pages/projects-list/projects-list.component";
// import { TasksListComponent } from "./pages/tasks-list/tasks-list.component";
import { UsersTasksComponent } from "./pages/users-tasks/users-tasks.component";

// export const routes: Routes = [
//   {path:'', redirectTo:'login', pathMatch:'full'},
//   {path:'login', component:LoginComponent},
//   {path:'signup', component:SignupComponent},
//   {
//     path: 'tasks',
//     component: TaskListComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: 'create-task', component: TaskFormComponent }
//     ]
//   }
//   // {path:'tasks', component:TaskListComponent , canActivate: [AuthGuard] },
//   // {path:'task/create-task', component:TaskFormComponent, canActivate: [AuthGuard]}
// ];

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },

  {
    path: "",
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "projects",
        component: ProjectsComponent,
      },
      {
        path: "edit-project/:id",
        component: ProjectformComponent,
      },
      {
        path: "tasks/:id",
        component: TaskListComponent,
      },
      { path: "tasks/:id/:name", component: TaskListComponent },

      {
        path: "add-task/:projectId",
        component: TaskFormComponent,
      },
      {
        path: "add-task/:projectId/:taskId",
        component: TaskFormComponent,
      },
      {
        path: "add-task/:projectId/:projectName",
        component: TaskFormComponent,
      },

      // For editing task
      {
        path: "add-task/:projectId/:projectName/:taskId",
        component: TaskFormComponent,
      },

      { path: "users", component: UsersListComponent },
      { path: "projects-list", component: ProjectsListComponent },
      { path: "users-tasks", component: UsersTasksComponent },
      
    ],
  },
  // Protected Routes
];
