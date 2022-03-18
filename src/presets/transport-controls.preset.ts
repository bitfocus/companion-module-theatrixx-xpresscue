import { Colors, Icons } from '../constants'
import { Preset, PresetCategory, PresetWithoutCategory } from './_preset.types'
import { PlayStateAction, PlayStateCommand } from '../actions/play-state.action'
import { PlayState, PlayStateFeedback } from '../feedbacks/play-state.feedback'

@PresetCategory('Transport Controls')
export class TransportControlsPreset implements Preset {
	get(): PresetWithoutCategory[] {
		return [TransportControlsPreset.buildTogglePlayPause()]
	}

	static buildTogglePlayPause(): PresetWithoutCategory {
		return {
			label: 'Toggle Play Pause',
			bank: {
				style: 'png',
				text: 'Toggle Play / Pause',
				size: 'auto',
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
			},
			actions: [PlayStateAction.build(PlayStateCommand.TogglePlayPause)],
			feedbacks: [
				PlayStateFeedback.build(PlayState.Playing, { png64: Icons.ICON_PAUSE_ACTIVE, text: '' }),
				PlayStateFeedback.build(PlayState.Paused, { png64: Icons.ICON_PLAY_ACTIVE, text: '' }),
			],
		}
	}
}
