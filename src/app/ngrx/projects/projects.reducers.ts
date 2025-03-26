import { createReducer, on } from "@ngrx/store"
import { ProjectState } from "./projects.state"
import { addProjectSuccess, loadProjectsSuccess, updateProjectSuccess } from "./projects.actions"


export const initialState: ProjectState = {
    projects: []
}

export const projectReducer = createReducer(
    initialState,
    on(loadProjectsSuccess, (state, { projects }) => ({ projects })),
    on(updateProjectSuccess, (state, { projectDate }) => ({ projects: state.projects.map(project => project.id === projectDate.id ? projectDate : project) })),
    on(addProjectSuccess, (state, { newProject }) => ({ ...state, projects: state.projects.concat(newProject) })),

)