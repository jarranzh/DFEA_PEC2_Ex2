import { createReducer, on } from '@ngrx/store';
import {
  addEducation,
  deleteEducation,
  getProfile,
  getProfileFailure,
  getProfileSuccess,
  updateEducation,
  updateProfile
} from '../actions/profile.actions';
import { Profile } from '../models/profile.model';
import { Education, Languages } from '../models/user.model';

export interface ProfileState {
  userProfile: Profile;
  education: Education[];
  languages: Languages[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ProfileState = {
  userProfile: null,
  education: null,
  languages: null,
  loading: false,
  loaded: false,
  error: null
};

const _profileReducer = createReducer(
  initialState,
  on(getProfile, state => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(getProfileSuccess, (state, { userProfile }) => ({
    ...state,
    education: userProfile.education,
    languages: userProfile.languages,
    userProfile: {
      name: userProfile.name,
      surname: userProfile.surname,
      birthDate: userProfile.birthDate,
      phone: userProfile.phone,
      nationality: userProfile.nationality,
      nif: userProfile.nif,
      aboutMe: userProfile.aboutMe,
      companyName: userProfile.companyName,
      companyDescription: userProfile.companyDescription,
      cif: userProfile.cif
    },
    loading: false,
    loaded: true,
    error: initialState.error
  })),

  on(getProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),

  on(updateProfile, (state, { profile }) => ({
    ...state,
    loading: false,
    loaded: true,
    userProfile: { ...profile }
  })),

  on(updateEducation, (state, { education }) => ({
    ...state,
    loading: false,
    loaded: true,
    education: [
      // Hago la actualización de educación según la solución de Tània Garcia, que es de la que parto.
      // En mi solución de la PEC1 puse un id a cada Education para identificarla y edita cualquier campo.
      // En este caso no podrímos modificar ni nombre ni nivel.
      ...state.education.map(edu => {
        if (edu.name === education.name && edu.level === education.level) {
          return { ...education };
        } else {
          return { ...edu };
        }
      })
    ]
  })),

  on(addEducation, (state, { education }) => ({
    ...state,
    loading: false,
    loaded: true,
    education: [...state.education, education]
  })),

  on(deleteEducation, (state, { education }) => ({
    ...state,
    loading: false,
    loaded: true,
    education: [
      ...state.education.map(edu => {
        if (edu.name === education.name && edu.level === education.level) {
          //fix this return
          return null;
        } else {
          return { ...edu };
        }
      })
    ]
  }))
);

export function profileReducer(state, action) {
  return _profileReducer(state, action);
}
