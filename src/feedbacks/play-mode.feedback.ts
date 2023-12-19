import { Player, Settings, SettingsStore } from '@theatrixx/xpresscue-connect'
import { Colors } from '../constants.js'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types.js'
import { Observable } from 'rxjs'
import { PlayModePicker } from '../pickers.js'
import { CompanionFeedbackButtonStyleResult, CompanionFeedbackDefinition } from '@companion-module/base'

@FeedbackId('play_mode')
export class PlayModeFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedbackDefinition {
		return {
			name: 'Play Mode',
			type: 'boolean',
			description: '',
			defaultStyle: {
				color: Colors.WHITE,
				bgcolor: Colors.BLUE,
			},
			options: [PlayModePicker()],
			callback: (event) => {
				const playMode = this.player.state.get(SettingsStore, 'playMode')
				return event.options.playMode === playMode
			},
		}
	}

	selectCheckFeedback(): Observable<any> {
		return this.player.state.select(SettingsStore, 'playMode')
	}

	static build(playMode: Settings['playMode'], style?: CompanionFeedbackButtonStyleResult): FeedbackPreset {
		return {
			feedbackId: getFeedbackId(this),
			options: {
				playMode,
			},
			style,
		}
	}
}
