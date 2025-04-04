import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Project } from '../../interfaces/User';

@Component({
  selector: 'app-projectform',
  imports: [FormsModule, RouterLink],
  templateUrl: './projectform.component.html',
  styleUrl: './projectform.component.css'
})
export class ProjectformComponent {


  project: Project = {
    id: 0,
    title: '',
    description: '',
    createdBy: '',
    projectManager: '',
    startDate: '',
    endDate: ''
  };
  isEdit = false;

  constructor(
    private projectService: ProjectService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.projectService.getProjectById(Number(id)).subscribe((data) => {
        this.project = data;
      });
    }
  }

  // saveProject(): void {
  //   if (this.isEdit) {
  //     this.projectService.updateProject(this.project.id, this.project).subscribe(() => {
  //       this.router.navigate(['/projects']);
  //     });
  //   } else {
  //     this.projectService.addProject(this.project).subscribe(() => {
  //       this.router.navigate(['/projects']);
  //     });
  //   }
  // }


}
