import { createReducer, on } from '@ngrx/store';
import {
  addEducation,
  addLanguage,
  deleteEducation,
  deleteLanguage,
  getProfile,
  getProfileFailure,
  getProfileSuccess,
  updateEducation,
  updateLanguage,
  updateProfile,
  updateUserActivities
} from '../actions/profile.actions';
import { Profile } from '../models/profile.model';
import { Education, Language } from '../models/user.model';

export interface ProfileState {
  userProfile: Profile;
  education: Education[];
  languages: Language[];
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
      type: userProfile.type,
      birthDate: userProfile.birthDate,
      phone: userProfile.phone,
      nationality: userProfile.nationality,
      nif: userProfile.nif,
      aboutMe: userProfile.aboutMe,
      companyName: userProfile.companyName,
      companyDescription: userProfile.companyDescription,
      cif: userProfile.cif,
      activities: userProfile.activities
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

  on(updateUserActivities, (state, { activities }) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      activities: [
        ...state.userProfile.activities.map(act =>
          activities.find(a => a.id === act.id)
        )
      ]
    },
    loading: false,
    loaded: true
  })),

  on(updateProfile, (state, { profile }) => ({
    ...state,
    loading: false,
    loaded: true,
    userProfile: { ...profile }
  })),

  on(updateEducation, (state, { selectedEducation, newEducation }) => ({
    ...state,
    loading: false,
    loaded: true,
    education: [
      ...state.education.map(edu => {
        if (
          edu.name === selectedEducation.name &&
          edu.level === selectedEducation.level
        ) {
          return { ...newEducation };
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

  on(deleteEducation, (state, { education }) => {
    const educations = [...state.education];
    [...state.education].map((edu, index) => {
      if (edu.name === education.name && edu.level === education.level) {
        educations.splice(index, 1);
      } else {
        return { ...edu };
      }
    });
    return {
      ...state,
      loading: false,
      loaded: true,
      education: [...educations]
    };
  }),

  on(updateLanguage, (state, { selectedLanguage, newLanguage }) => ({
    ...state,
    loading: false,
    loaded: true,
    languages: [
      ...state.languages.map(lan => {
        if (
          lan.language === selectedLanguage.language &&
          lan.level === selectedLanguage.level
        ) {
          return { ...newLanguage };
        } else {
          return { ...lan };
        }
      })
    ]
  })),

  on(addLanguage, (state, { language }) => ({
    ...state,
    loading: false,
    loaded: true,
    languages: [...state.languages, language]
  })),

  on(deleteLanguage, (state, { language }) => {
    const languages = [...state.languages];
    [...state.languages].map((lan, index) => {
      if (lan.language === language.language && lan.level === language.level) {
        languages.splice(index, 1);
      } else {
        return { ...lan };
      }
    });
    return {
      ...state,
      loading: false,
      loaded: true,
      languages: [...languages]
    };
  })
);

export function profileReducer(state, action) {
  return _profileReducer(state, action);
}
