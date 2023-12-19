import { Player, SettingsStore } from '@theatrixx/xpresscue-connect'
import { Colors } from '../constants.js'
import { Feedback, FeedbackId } from './_feedback.types.js'
import { Observable } from 'rxjs'
import { MultiDeviceModePicker } from '../pickers.js'
import { CompanionFeedbackDefinition } from '@companion-module/base'

@FeedbackId('multi_device_mode')
export class MultiDeviceModeFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedbackDefinition {
		return {
			name: 'Multi Device Mode',
			type: 'boolean',
			description: '',
			defaultStyle: {
				color: Colors.BLACK,
				bgcolor: Colors.ORANGE,
			},
			options: [MultiDeviceModePicker()],
			callback: (event) => {
				const isFollowerState = this.player.state.get(SettingsStore, 'isFollower')
				const isFollower = event.options.multiDeviceMode === 'follower'
				return isFollower === isFollowerState
			},
		}
	}

	selectCheckFeedback(): Observable<any> {
		return this.player.state.select(SettingsStore, 'isFollower')
	}
}
