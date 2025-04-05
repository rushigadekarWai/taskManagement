import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


interface Project {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  projectManager: string;
  startDate: string;
  endDate: string;
} 

@Component({
  selector: 'app-projects-list',
  imports: [FormsModule, NgIf, NgFor, NgClass],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css'
})
export class ProjectsListComponent {
  projects: any[] = [];
  filteredProjects: any[] = [];
  filterText: string = '';
  selectedFilterKey: string = 'title';
  sortOrder: 'ASC' | 'DESC' = 'ASC';

  editMode: boolean = false;
  addMode: boolean = false;
  editableProject: any = {};

  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.http.get<any[]>('http://localhost:3000/projects').subscribe((res) => {
      this.projects = res;
      this.applyProjectFilter();
    });
  }

  applyProjectFilter(): void {
    const filterKey = this.selectedFilterKey;
    const filterValue = this.filterText.toLowerCase();

    this.filteredProjects = this.projects
      .filter((project) =>
        project[filterKey]?.toLowerCase().includes(filterValue)
      )
      .sort((a, b) => {
        const aValue = a[filterKey]?.toLowerCase();
        const bValue = b[filterKey]?.toLowerCase();
        if (aValue < bValue) return this.sortOrder === 'ASC' ? -1 : 1;
        if (aValue > bValue) return this.sortOrder === 'ASC' ? 1 : -1;
        return 0;
      });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.applyProjectFilter();
  }

  clearFilter(): void {
    this.filterText = '';
    this.applyProjectFilter();
  }

  openEdit(project: any): void {
    this.editMode = true;
    this.addMode = false;
    this.editableProject = { ...project };
  }

  openAddForm(): void {
    this.addMode = true;
    this.editMode = false;
    this.editableProject = {
      title: '',
      description: '',
      createdBy: '',
      projectManager: '',
      startDate: '',
      endDate: '',
    };
  }

  cancelEdit(): void {
    this.editMode = false;
    this.addMode = false;
    this.editableProject = {};
  }

  // updateProject(): void {
  //   const id = this.editableProject.id;
  //   this.http
  //     .put(`http://localhost:3000/projects/${id}`, this.editableProject)
  //     .subscribe(() => {
  //       this.fetchProjects();
  //       this.cancelEdit();
  //     });
  // }

 
addProject(): void {
  const lastId = this.projects.length
    ? Math.max(...this.projects.map((p) => parseInt(p.id))) + 1
    : 1;

  this.editableProject.id = lastId.toString();

  this.http.post('http://localhost:3000/projects', this.editableProject)
    .subscribe(() => {
      this.fetchProjects();
      this.cancelEdit();
      this.showToast('Project added successfully!', 'success');
    });
}
  

updateProject(): void {
  const id = this.editableProject.id;
  this.http.put(`http://localhost:3000/projects/${id}`, this.editableProject)
    .subscribe(() => {
      this.fetchProjects();
      this.cancelEdit();
      this.showToast('Project updated successfully!', 'success');
    });
}

deleteProject(id: number): void {
  if (confirm('Are you sure you want to delete this project?')) {
    this.http.delete(`http://localhost:3000/projects/${id}`)
      .subscribe(() => {
        this.fetchProjects();
        this.showToast('Project deleted successfully.', 'delete');

      });
  }
}

  viewTasks(projectId: string, projectTitle: string): void {
    this.router.navigate(['/users-tasks'], {
      queryParams: {
        id: projectId,
        title: projectTitle
      }
    });
  }

  notificationMessage = '';
showNotification = false;
notificationClass = ''; // e.g., success, error

showToast(message: string, type: 'success' | 'error' | 'delete' | 'warning' | 'info') {
  this.notificationMessage = message;
  this.notificationClass = type;
  this.showNotification = true;

  setTimeout(() => {
    this.showNotification = false;
  }, 2000);
}

}
