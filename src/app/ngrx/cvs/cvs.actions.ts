import { createAction, props } from "@ngrx/store";
import { CV } from "../../model/cv.model";
import { CvBase } from "../../model/cv-base.model";
import { Project } from "../../model/project.model";



export const initCvs = createAction('[Cvs/Component] Get Cvs');
export const loadCvsSuccess = createAction('[Cvs] Load Cvs Success', props<{ cvs: CV[] }>());
export const loadCvsFailure = createAction('[Cvs] Load Cvs Failure', props<{ error: string }>());

export const updateCv = createAction('[Cvs] Update Cv', props<{ id: string; cv: CvBase }>());
export const updateCvSuccess = createAction('[Cvs] Update Cv Success', props<{ cvData: CV }>());
export const updateCvFailure = createAction('[Cvs] Update Cv Failure', props<{ error: string }>());

export const addCv = createAction('[Cvs] Add Cv', props<{ cv: CV }>());
export const addCvSuccess = createAction('[Cvs] Add Cv Success', props<{ newCv: CV }>());
export const addCvFailure = createAction('[Cvs] Add Cv Failure', props<{ error: string }>());

export const deleteCv = createAction('[Cvs] Delete Cv', props<{ id: string }>());
export const deleteCvSuccess = createAction('[Cvs] Delete Cv Success');
export const deleteCvFailure = createAction('[Cvs] Delete Cv Failure', props<{ error: string }>());

export const updateCvProjectsIds = createAction('[Cvs]] Update projectsIds', props<{ cvId: string; updateProjectsIds: string[] }>());
export const updateCvProjectsIdsSuccess = createAction('[Cvs] Update projectsIds Success', props<{ updateCv: CV }>());
export const updateCvProjectsIdsFailure = createAction('[Cvs] Update projectsIds Failure', props<{ error: string }>());
