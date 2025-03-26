import { createReducer, on } from "@ngrx/store"
import { CvState } from "./cvs.state"
import { addCvSuccess, loadCvsSuccess, updateCvProjectsIdsSuccess, updateCvSuccess } from "./cvs.actions"


export const initialState: CvState = {
    cvs: []
}

export const cvReducer = createReducer(
    initialState,
    on(loadCvsSuccess, (state, { cvs }) => ({ cvs })),
    on(updateCvSuccess, (state, { cvData }) => ({ cvs: state.cvs.map(cv => cv.id === cvData.id ? cvData : cv) })),
    on(addCvSuccess, (state, { newCv }) => ({ ...state, cvs: state.cvs.concat(newCv) })),
    on(updateCvProjectsIdsSuccess, (state, { updateCv }) => ({ ...state, cvs: state.cvs.map(cv => cv.id === updateCv.id ? updateCv : cv) }))
)