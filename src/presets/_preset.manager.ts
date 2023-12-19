import { Player, Type } from '@theatrixx/xpresscue-connect'
import { Manager } from '../utils/manager.class.js'
import { LoadPlaylistPreset } from './load-playlist.preset.js'
import { SetNextMediaTextPreset, SetNextMediaThumbnailPreset } from './set-next-media.preset.js'
import { TransportControlsPreset } from './transport-controls.preset.js'
import { Preset, PresetWithoutCategory, PRESET_IDKEY } from './_preset.types.js'
import { CompanionPresetDefinitions } from '@companion-module/base'

const ALL_PRESETS: Type<Preset>[] = [
	SetNextMediaTextPreset,
	SetNextMediaThumbnailPreset,
	LoadPlaylistPreset,
	TransportControlsPreset,
]

export class PresetManager extends Manager<Record<string, PresetWithoutCategory>, Preset> {
	constructor(protected readonly player: Player) {
		super(player, PRESET_IDKEY)
		this.initialize(ALL_PRESETS)
	}

	getFlat(): CompanionPresetDefinitions {
		return Object.entries(this.get()).reduce((total, [id, presets]) => {
			return { ...total, ...PresetManager.mapCategory(id, presets) }
		}, {} as CompanionPresetDefinitions)
	}

	private static mapCategory(
		categoryId: string,
		presets: Record<string, PresetWithoutCategory>
	): CompanionPresetDefinitions {
		const res: CompanionPresetDefinitions = {}

		for (const [id, obj] of Object.entries(presets)) {
			res[id] = {
				...obj,
				category: categoryId,
			}
		}

		return res
	}
}
