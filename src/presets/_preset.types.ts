import { CompanionButtonPresetDefinition } from '@companion-module/base'
import { createClassKeyDecorator } from '../utils/decorators'
import { ManagedInstance } from '../utils/manager.class'

export const PRESET_IDKEY = 'presetCategory'

export const PresetCategory = createClassKeyDecorator(PRESET_IDKEY)

export type PresetWithoutCategory = Omit<CompanionButtonPresetDefinition, 'category'>

export interface Preset extends ManagedInstance<Record<string, PresetWithoutCategory>> {}
