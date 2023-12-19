import { DeviceStateStore, Player } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { Colors } from '../constants'
import { Feedback, FeedbackId } from './_feedback.types'
import { CompanionFeedbackDefinition } from '@companion-module/base'

@FeedbackId('device_busy')
export class DeviceBusyFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedbackDefinition {
		return {
			name: 'Device Busy',
			type: 'boolean',
			description: '',
			defaultStyle: {
				color: Colors.BLACK,
				bgcolor: Colors.YELLOW,
			},
			options: [],
			callback: () => {
				return this.player.state.get(DeviceStateStore, 'isBusy')
			},
		}
	}

	selectCheckFeedback(): Observable<any> {
		return this.player.state.select(DeviceStateStore, 'isBusy')
	}
}
