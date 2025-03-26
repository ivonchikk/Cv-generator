import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../model/project.model';
import { ProjectBase } from '../../../model/project-base.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly projectsUrl = "http://localhost:3000/projects"

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.projectsUrl)
  }

  public updateProjects(id: string, projectData: ProjectBase): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.httpClient.patch<Project>(url, projectData)
  }

  public addProject(projectData: Project): Observable<Project> {
    return this.httpClient.post<Project>(this.projectsUrl, projectData)
  }

  public deleteProject(projectId: string): Observable<Project> {
    return this.httpClient.delete<Project>(`${this.projectsUrl}/${projectId}`)
  }

}
