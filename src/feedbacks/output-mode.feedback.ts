import { Player, SettingsStore } from '@theatrixx/xpresscue-connect'
import { Colors } from '../constants'
import { CompanionFeedback, CompanionFeedbackEvent } from '../../../../instance_skel_types'
import { Feedback, FeedbackId } from './_feedback.types'
import { Observable } from 'rxjs'
import { VideoOutputModePicker } from '../pickers'

@FeedbackId('output_mode')
export class OutputModeFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedback {
		return {
			label: 'Output Mode',
			type: 'boolean',
			description: '',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLUE,
			},
			options: [VideoOutputModePicker()],
			callback: (event: CompanionFeedbackEvent) => {
				const outputMode = this.player.state.get(SettingsStore, 'videoOutputMode')
				return event.options.videoOutputMode === outputMode
			},
		}
	}

	selectCheckFeedback(): Observable<string> {
		return this.player.state.select(SettingsStore, 'videoOutputMode')
	}
}
