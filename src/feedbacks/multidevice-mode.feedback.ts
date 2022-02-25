import { Player, SettingsStore } from '@theatrixx/xpresscue-connect'
import { Colors } from '../constants'
import { CompanionFeedback, CompanionFeedbackEvent } from '../../../../instance_skel_types'
import { Feedback, FeedbackId } from './_feedback.types'
import { Observable } from 'rxjs'
import { MultiDeviceModePicker } from '../pickers'

@FeedbackId('multi_device_mode')
export class MultiDeviceModeFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedback {
		return {
			label: 'Multi Device Mode',
			type: 'boolean',
			description: '',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.ORANGE,
			},
			options: [MultiDeviceModePicker()],
			callback: (event: CompanionFeedbackEvent) => {
				const isFollowerState = this.player.state.get(SettingsStore, 'isFollower')
				const isFollower = event.options.multiDeviceMode === 'follower'
				return isFollower === isFollowerState
			},
		}
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(SettingsStore, 'isFollower')
	}
}
