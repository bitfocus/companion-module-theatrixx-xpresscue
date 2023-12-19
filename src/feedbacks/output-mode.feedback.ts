import { Player, SettingsStore } from '@theatrixx/xpresscue-connect'
import { Colors } from '../constants'
import { Feedback, FeedbackId } from './_feedback.types'
import { Observable } from 'rxjs'
import { VideoOutputModePicker } from '../pickers'
import { CompanionFeedbackDefinition } from '@companion-module/base'

@FeedbackId('output_mode')
export class OutputModeFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedbackDefinition {
		return {
			name: 'Output Mode',
			type: 'boolean',
			description: '',
			defaultStyle: {
				color: Colors.WHITE,
				bgcolor: Colors.BLUE,
			},
			options: [VideoOutputModePicker()],
			callback: (event) => {
				const outputMode = this.player.state.get(SettingsStore, 'videoOutputMode')
				return event.options.videoOutputMode === outputMode
			},
		}
	}

	selectCheckFeedback(): Observable<string> {
		return this.player.state.select(SettingsStore, 'videoOutputMode')
	}
}
