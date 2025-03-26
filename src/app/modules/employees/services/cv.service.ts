import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CV } from '../../../model/cv.model';
import { CvBase } from '../../../model/cv-base.model';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private readonly cvsUrl = "http://localhost:3000/cvs"

  constructor(
    private readonly httpClient: HttpClient,
    private employeeService: EmployeeService,
  ) { }

  public getCvs(): Observable<CV[]> {
    return this.httpClient.get<CV[]>(this.cvsUrl)
  }

  public updateCv(id: string, cv: CvBase): Observable<CV> {
    const url = `${this.cvsUrl}/${id}`;
    return this.httpClient.patch<CV>(url, cv)
  }

  public addCv(cvData: CV): Observable<CV> {
    return this.httpClient.post<CV>(this.cvsUrl, cvData)
  }

  public deleteCv(cvId: string): Observable<CV> {
    return this.httpClient.delete<CV>(`${this.cvsUrl}/${cvId}`)
  }

    public updateProjectId (cvId: string, projectsIds: string[] | undefined): Observable<CV> {
      const url = `${this.cvsUrl}/${cvId}`;
      return this.httpClient.patch<CV>(url, {projectsIds})
    }

}
