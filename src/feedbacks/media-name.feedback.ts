import { MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { CompanionFeedback } from '../../../../instance_skel_types'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types'
import { Observable } from 'rxjs'
import { MediaPicker } from '../pickers'

@FeedbackId('media_name')
export class MediaNameFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedback {
		return {
			label: 'Media Name',
			type: 'advanced',
			description: '',
			options: [MediaPicker(this.player)],
			callback: (event): any => {
				const medias = this.player.state.get(MediaFileStore)
				const media = medias.find((m) => m._id === event.options.mediaId)
				if (!media) {
					return false
				}
				return {
					text: media.name,
				}
			},
		}
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(MediaFileStore)
	}

	static build(mediaId: string): FeedbackPreset {
		return {
			type: getFeedbackId(this),
			options: {
				mediaId,
			},
		}
	}
}
