import { Player, SettingsStore } from '@theatrixx/xpresscue-connect'
import { Colors } from '../constants'
import { CompanionFeedback, CompanionFeedbackEvent } from '../../../../instance_skel_types'
import { Feedback, FeedbackId } from './_feedback.types'
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
}
