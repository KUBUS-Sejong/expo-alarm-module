import { UnavailabilityError } from 'expo-modules-core';

import AlarmeModuleExpo from './AlarmeModuleExpo';

export async function set(): Promise<boolean | null> {
    // if (!AlarmeModuleExpo.set) {
    //   throw new UnavailabilityError('expo-cellular', 'allowsVoipAsync');
    // }
    return await AlarmeModuleExpo.set();
  }