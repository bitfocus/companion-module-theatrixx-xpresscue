import { Player, Type } from '@theatrixx/xpresscue-connect'
import { CompanionPreset } from '../../../../instance_skel_types'
import { Manager } from '../utils/manager.class'
import { SetNextMediaPreset } from './set-next-media.preset'
import { Preset, PresetWithoutCategory, PRESET_IDKEY } from './_preset.types'

const ALL_PRESETS: Type<Preset>[] = [SetNextMediaPreset]

export class PresetManager extends Manager<PresetWithoutCategory[], Preset> {
	constructor(protected readonly player: Player) {
		super(player, PRESET_IDKEY)
		this.initialize(ALL_PRESETS)
	}

	getFlat(): CompanionPreset[] {
		return Object.entries(this.get()).reduce((total, [id, presets]) => {
			return [...total, ...PresetManager.mapCategory(id, presets)]
		}, [] as CompanionPreset[])
	}

	private static mapCategory(categoryId: string, input: PresetWithoutCategory[]): CompanionPreset[] {
		return input.map((p) => ({ ...p, category: categoryId }))
	}
}
