import { Colors } from '../constants'
import { CompanionFeedback, CompanionFeedbackEvent } from '../../../../instance_skel_types'
import { Feedback, FeedbackId } from './_feedback.types'
import { Player, DeviceStateStore } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { TimePicker } from '../pickers'

@FeedbackId('time_remaining')
export class TimeRemainingFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedback {
		return {
			label: 'Time Remaining',
			type: 'boolean',
			description: '',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.RED,
			},
			options: [TimePicker()],
			callback: (event: CompanionFeedbackEvent) => {
				const { remaining } = this.player.state.get(DeviceStateStore, 'progress')
				return remaining <= (event.options.time as number) * 1000 && remaining !== 0
			},
		}
	}

	selectCheckFeedback(): Observable<any> {
		return this.player.state.select(DeviceStateStore, 'progress')
	}
}
