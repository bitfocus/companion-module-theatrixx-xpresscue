import { DeviceStateStore, Player } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { Colors } from '../constants'
import { CompanionFeedback } from '../../../../instance_skel_types'
import { Feedback, FeedbackId } from './_feedback.types'

@FeedbackId('device_busy')
export class DeviceBusyFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedback {
		return {
			label: 'Device Busy',
			type: 'boolean',
			description: '',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.YELLOW,
			},
			options: [],
			callback: () => {
				return this.player.state.get(DeviceStateStore, 'isBusy')
			},
		}
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(DeviceStateStore, 'isBusy')
	}
}
