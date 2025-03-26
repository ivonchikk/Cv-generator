import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CvState } from "./cvs.state";
import { CV } from "../../model/cv.model";



export const selectCvs = createFeatureSelector<CvState>('cvs')
  
  export const selectAllCvs = createSelector(
    selectCvs,
    (state:CvState) => state.cvs
  );

  export const getCvsById = (id: string) => createSelector(
    selectAllCvs,
    (cvs: CV[]):CV | undefined => cvs.find((cv) => cv.id === id)
  )
