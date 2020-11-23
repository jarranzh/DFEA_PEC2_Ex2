import { LoginEffects } from './login.effects';
import { ActivitiesEffects } from 'src/app/activities/effects/activities.effects';
import { ProfileEffects } from 'src/app/profile/effects/profile.effects';

export const EffectsArray: any[] = [
  LoginEffects,
  ActivitiesEffects,
  ProfileEffects
];
