import { Colors, CompanionIcons } from '../constants'
import { Preset, PresetCategory, PresetWithoutCategory } from './_preset.types'
import { PlayStateAction, PlayStateCommand } from '../actions/play-state.action'
import { PlayState, PlayStateFeedback } from '../feedbacks/play-state.feedback'
import { TakeAction } from '../actions/take.action'
import { PlayModeFeedback } from '../feedbacks/play-mode.feedback'

@PresetCategory('Transport Controls')
export class TransportControlsPreset implements Preset {
	get(): Record<string, PresetWithoutCategory> {
		return {
			transport_toggleplaypause: TransportControlsPreset.buildTogglePlayPause(),
			transport_take: TransportControlsPreset.buildTake(),
			transport_stop: TransportControlsPreset.buildStop(),
			transport_pause: TransportControlsPreset.buildPause(),
			transport_play: TransportControlsPreset.buildPlay(),
		}
	}

	static buildTogglePlayPause(): PresetWithoutCategory {
		return {
			name: 'Toggle Play Pause',
			type: 'button',
			style: {
				text: 'Toggle Play / Pause',
				size: 'auto',
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
			},
			steps: [
				{
					down: [PlayStateAction.build(PlayStateCommand.TogglePlayPause)],
					up: [],
				},
			],
			feedbacks: [
				PlayStateFeedback.build(PlayState.Playing, { png64: CompanionIcons.ICON_PAUSE_ACTIVE, text: '' }),
				PlayStateFeedback.build(PlayState.Paused, { png64: CompanionIcons.ICON_PLAY_ACTIVE, text: '' }),
			],
		}
	}

	static buildTake(): PresetWithoutCategory {
		return {
			name: 'Take',
			type: 'button',
			style: {
				text: 'TAKE',
				size: 'auto',
				color: Colors.WHITE,
				bgcolor: Colors.RED,
			},
			steps: [
				{
					down: [TakeAction.build()],
					up: [],
				},
			],
			feedbacks: [PlayModeFeedback.build('direct', { bgcolor: Colors.BLACK, color: Colors.GREY })],
		}
	}

	static buildStop(): PresetWithoutCategory {
		return {
			name: 'Stop',
			type: 'button',
			style: {
				text: '',
				size: 'auto',
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: CompanionIcons.ICON_STOP_INACTIVE,
			},
			steps: [
				{
					down: [PlayStateAction.build(PlayStateCommand.Stop)],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	static buildPause(): PresetWithoutCategory {
		return {
			name: 'Pause',
			type: 'button',
			style: {
				text: '',
				size: 'auto',
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: CompanionIcons.ICON_PAUSE_INACTIVE,
			},
			steps: [
				{
					down: [PlayStateAction.build(PlayStateCommand.Pause)],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	static buildPlay(): PresetWithoutCategory {
		return {
			name: 'Play',
			type: 'button',
			style: {
				text: '',
				size: 'auto',
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: CompanionIcons.ICON_PLAY_INACTIVE,
			},
			steps: [
				{
					down: [PlayStateAction.build(PlayStateCommand.Play)],
					up: [],
				},
			],
			feedbacks: [],
		}
	}
}
