import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ProjectState } from "./projects.state";
import { Project } from "../../model/project.model";



export const selectProjects = createFeatureSelector<ProjectState>('projects')
  
  export const selectAllProjects = createSelector(
    selectProjects,
    (state:ProjectState) => state.projects
  );

  export const getProjectsById = (id: string) => createSelector(
    selectAllProjects,
    (projects: Project[]):Project | undefined => projects.find((project) => project.id === id)
  )
