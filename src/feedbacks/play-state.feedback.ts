import { Player, DeviceStateStore } from '@theatrixx/xpresscue-connect'
import { Colors } from '../constants'
import { CompanionFeedback, CompanionFeedbackBoolean, CompanionFeedbackEvent } from '../../../../instance_skel_types'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types'
import { Observable } from 'rxjs'

@FeedbackId('play_state')
export class PlayStateFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedback {
		return {
			label: 'Play State',
			type: 'boolean',
			description: '',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.GREEN,
			},
			options: [
				{
					id: 'playState',
					label: 'State',
					type: 'dropdown',
					default: 'playing',
					choices: [
						{ id: PlayState.Playing, label: 'Playing' },
						{ id: PlayState.Paused, label: 'Paused' },
						{ id: PlayState.Stopped, label: 'Stopped' },
					],
				},
			],
			callback: (event: CompanionFeedbackEvent) => {
				const playState = this.player.state.get(DeviceStateStore, 'playState')
				return event.options.playState === playState
			},
		}
	}

	selectCheckFeedback(): Observable<any> {
		return this.player.state.select(DeviceStateStore, 'playState')
	}

	static build(playState: PlayState, style?: CompanionFeedbackBoolean['style']): FeedbackPreset {
		return {
			type: getFeedbackId(this),
			options: {
				playState,
			},
			style,
		}
	}
}

export enum PlayState {
	Playing = 'playing',
	Paused = 'paused',
	Stopped = 'stopped',
}
