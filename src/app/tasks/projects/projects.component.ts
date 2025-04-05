import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProjectformComponent } from '../projectform/projectform.component';
import { Project } from '../../interfaces/User';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, NgIf, ProjectformComponent,FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})



export class ProjectsComponent {
  projects: Project[] = [];
  isEdit: boolean = false;
  showForm: boolean = false; // Control form visibility
  project: Project = this.getEmptyProject(); // Empty project for form binding

  constructor(private projectService: ProjectService, private router: Router, private http:HttpClient) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  // Fetch all projects
  loadProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data.map((proj) => ({
        ...proj,
        id: Number(proj.id), // Ensure ID is a number, in case it's stored as a string
      }));
    });
  }
  

  // Open form for adding a new project
  openAddForm(): void {
    this.isEdit = false;
    this.project = this.getEmptyProject();
    this.showForm = true;
  }

  // Open form for editing a project
  openEditForm(project: Project): void {
    this.isEdit = true;
    this.project = { ...project }; // Copy project to avoid modifying original
    this.showForm = true;
  }

  


  saveProject(): void {
    if (this.isEdit) {
      // For editing, ensure the ID remains a number (no conversion needed)
      const projectId = this.project.id;
  
      this.http.put<Project>(`http://localhost:3000/projects/${projectId}`, this.project).subscribe(
        () => {
          this.loadProjects(); // Refresh the list of projects
          this.closeForm();     // Close the form
        },
        (error) => {
          console.error('Error updating project:', error);
          alert('There was an error updating the project.');
        }
      );
    } else {
      // For adding a new project
      this.http.get<Project[]>('http://localhost:3000/projects').subscribe(
        (data: Project[]) => {
          // Get the highest project ID and increment it
          const maxId = data.length > 0 ? Math.max(...data.map((p) => p.id)) : 0;
          this.project.id = maxId + 1;  // ID is a number here
  
          // Convert the project ID to a string before sending it to JSON Server
          const projectWithStringId = {
            ...this.project,
            id: String(this.project.id),  // Convert to string before sending
          };
  
          // Directly add the new project to the backend
          this.http.post<Project>('http://localhost:3000/projects', projectWithStringId).subscribe(
            (newProject: Project) => {
              this.projects.push(newProject);
              this.closeForm();
            },
            (error) => {
              console.error('Error adding project:', error);
              alert('There was an error adding the project.');
            }
          );
        },
        (error) => {
          console.error('Error fetching projects:', error);
          alert('There was an error fetching the projects.');
        }
      );
    }
  }
  
  
  

  // Delete a project
  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(
        () => {
          this.loadProjects();
        },
        (error) => {
          console.error('Error deleting project:', error);
          alert('There was an error deleting the project.');
        }
      );
    }
  }


  // Navigate to Task List for a project
  // viewTasks(projectId: number): void {
  //   this.router.navigate(['/tasks', projectId]);
  // }

  viewTasks(projectId: number, projectName: string): void {
    this.router.navigate(['/tasks', projectId, projectName]);
  }
  
  // Close the form
  closeForm(): void {
    this.showForm = false;
    this.project = this.getEmptyProject();
    this.isEdit = false;
  }

  // Get an empty project object
  getEmptyProject(): Project {
    return {
      id: 0,
      title: '',
      description: '',
      createdBy: '',
      projectManager: '',
      startDate: '',
      endDate: '',
    };
  }


  //  filter code---------------------------------------------------------

  








}
