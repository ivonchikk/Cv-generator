import { createAction, props } from "@ngrx/store";
import { Project } from "../../model/project.model";
import { ProjectBase } from "../../model/project-base.model";



export const initProjects = createAction('[Projects/Component] Get Projects');
export const loadProjectsSuccess = createAction('[Projects] Load Projects Success', props<{ projects: Project[] }>());
export const loadProjectsFailure = createAction('[Projects] Load Projects Failure', props<{ error: string }>());

export const updateProject = createAction('[Projects] Update Projects', props<{ id: string; project: ProjectBase }>());
export const updateProjectSuccess = createAction('[Projects] Update Projects Success', props<{projectDate: Project}>());
export const updateProjectFailure = createAction('[Projects] Update Projects Failure', props<{ error: string }>());

export const addProject = createAction('[Projects] Add Project', props<{ project: Project }>());
export const addProjectSuccess = createAction('[Projects] Add Projects Success', props<{ newProject: Project }>());
export const addProjectFailure = createAction('[Projects] Add Projects Failure', props<{ error: string }>());

export const deleteProject = createAction('[Projects] Delete Project', props<{ id: string }>());
export const deleteProjectSuccess = createAction('[Projects] Delete Projects Success');
export const deleteProjectFailure = createAction('[Projects] Delete Projects Failure', props<{ error: string }>());