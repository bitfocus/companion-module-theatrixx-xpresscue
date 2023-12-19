import { Colors } from '../constants'
import { Feedback, FeedbackId } from './_feedback.types'
import { Player, DeviceStateStore } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { TimePicker } from '../pickers'
import { CompanionFeedbackDefinition } from '@companion-module/base'

@FeedbackId('time_remaining')
export class TimeRemainingFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedbackDefinition {
		return {
			name: 'Time Remaining',
			type: 'boolean',
			description: '',
			defaultStyle: {
				color: Colors.WHITE,
				bgcolor: Colors.RED,
			},
			options: [TimePicker()],
			callback: (event) => {
				const { remaining } = this.player.state.get(DeviceStateStore, 'progress')
				return remaining <= (event.options.time as number) * 1000 && remaining !== 0
			},
		}
	}

	selectCheckFeedback(): Observable<any> {
		return this.player.state.select(DeviceStateStore, 'progress')
	}
}
