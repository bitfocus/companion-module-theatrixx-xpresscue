import { MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types.js'
import { Observable } from 'rxjs'
import { MediaPicker } from '../pickers.js'
import { filterEntitiesChanged } from '../utils/operators.js'
import { CompanionFeedbackDefinition } from '@companion-module/base'

@FeedbackId('media_name')
export class MediaNameFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedbackDefinition {
		return {
			name: 'Media Name',
			type: 'advanced',
			description: '',
			options: [MediaPicker(this.player)],
			callback: (event) => {
				const medias = this.player.state.get(MediaFileStore)
				const media = medias.find((m) => m._id === event.options.mediaId)
				if (!media) {
					return {}
				}
				return {
					text: media.name,
				}
			},
		}
	}

	selectCheckFeedback(): Observable<any> {
		return this.player.state.select(MediaFileStore).pipe(filterEntitiesChanged())
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(MediaFileStore).pipe(filterEntitiesChanged())
	}

	static build(mediaId: string): FeedbackPreset {
		return {
			feedbackId: getFeedbackId(this),
			options: {
				mediaId,
			},
		}
	}
}
