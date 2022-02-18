import { createClassKeyDecorator } from '../utils/decorators';
import { CompanionPreset } from '../../../../instance_skel_types';
import { ManagedInstance } from '../utils/manager.class';

export const PRESET_IDKEY = 'presetCategory';

export const PresetCategory = createClassKeyDecorator(PRESET_IDKEY);

export type PresetWithoutCategory = Omit<CompanionPreset, 'category'>;

export interface Preset extends ManagedInstance<PresetWithoutCategory[]> {}
