import { Player, Settings, SettingsStore } from '@theatrixx/xpresscue-connect'
import { Colors } from '../constants'
import { CompanionFeedback, CompanionFeedbackBoolean, CompanionFeedbackEvent } from '../../../../instance_skel_types'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types'
import { Observable } from 'rxjs'
import { PlayModePicker } from '../pickers'

@FeedbackId('play_mode')
export class PlayModeFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedback {
		return {
			label: 'Play Mode',
			type: 'boolean',
			description: '',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLUE,
			},
			options: [PlayModePicker()],
			callback: (event: CompanionFeedbackEvent) => {
				const playMode = this.player.state.get(SettingsStore, 'playMode')
				return event.options.playMode === playMode
			},
		}
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(SettingsStore, 'playMode')
	}

	static build(playMode: Settings['playMode'], style?: CompanionFeedbackBoolean['style']): FeedbackPreset {
		return {
			type: getFeedbackId(this),
			options: {
				playMode,
			},
			style,
		}
	}
}
