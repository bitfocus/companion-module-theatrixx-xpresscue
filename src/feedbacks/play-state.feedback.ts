import { Player, DeviceStateStore } from '@theatrixx/xpresscue-connect'
import { Colors } from '../constants'
import { CompanionFeedback, CompanionFeedbackEvent } from '../../../../instance_skel_types'
import { Feedback, FeedbackId } from './_feedback.types'
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
						{ id: 'playing', label: 'Playing' },
						{ id: 'paused', label: 'Paused' },
						{ id: 'stopped', label: 'Stopped' },
					],
				},
			],
			callback: (event: CompanionFeedbackEvent) => {
				const playState = this.player.state.get(DeviceStateStore, 'playState')
				return event.options.playState === playState
			},
		}
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(DeviceStateStore, 'playState')
	}
}
