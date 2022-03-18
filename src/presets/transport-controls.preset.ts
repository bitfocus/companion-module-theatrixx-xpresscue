import { Colors, CompanionIcons } from '../constants'
import { Preset, PresetCategory, PresetWithoutCategory } from './_preset.types'
import { PlayStateAction, PlayStateCommand } from '../actions/play-state.action'
import { PlayState, PlayStateFeedback } from '../feedbacks/play-state.feedback'
import { TakeAction } from '../actions/take.action'
import { PlayModeFeedback } from '../feedbacks/play-mode.feedback'

@PresetCategory('Transport Controls')
export class TransportControlsPreset implements Preset {
	get(): PresetWithoutCategory[] {
		return [
			TransportControlsPreset.buildTogglePlayPause(),
			TransportControlsPreset.buildTake(),
			TransportControlsPreset.buildStop(),
			TransportControlsPreset.buildPause(),
			TransportControlsPreset.buildPlay(),
		]
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
				PlayStateFeedback.build(PlayState.Playing, { png64: CompanionIcons.ICON_PAUSE_ACTIVE, text: '' }),
				PlayStateFeedback.build(PlayState.Paused, { png64: CompanionIcons.ICON_PLAY_ACTIVE, text: '' }),
			],
		}
	}

	static buildTake(): PresetWithoutCategory {
		return {
			label: 'Take',
			bank: {
				style: 'text',
				text: 'TAKE',
				size: 'auto',
				color: Colors.WHITE,
				bgcolor: Colors.RED,
			},
			actions: [TakeAction.build()],
			feedbacks: [PlayModeFeedback.build('direct', { bgcolor: Colors.BLACK, color: Colors.GREY })],
		}
	}

	static buildStop(): PresetWithoutCategory {
		return {
			label: 'Stop',
			bank: {
				style: 'png',
				text: '',
				size: 'auto',
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: CompanionIcons.ICON_STOP_INACTIVE,
			},
			actions: [PlayStateAction.build(PlayStateCommand.Stop)],
			feedbacks: [],
		}
	}

	static buildPause(): PresetWithoutCategory {
		return {
			label: 'Pause',
			bank: {
				style: 'png',
				text: '',
				size: 'auto',
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: CompanionIcons.ICON_PAUSE_INACTIVE,
			},
			actions: [PlayStateAction.build(PlayStateCommand.Pause)],
			feedbacks: [],
		}
	}

	static buildPlay(): PresetWithoutCategory {
		return {
			label: 'Play',
			bank: {
				style: 'png',
				text: '',
				size: 'auto',
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: CompanionIcons.ICON_PLAY_INACTIVE,
			},
			actions: [PlayStateAction.build(PlayStateCommand.Play)],
			feedbacks: [],
		}
	}
}
