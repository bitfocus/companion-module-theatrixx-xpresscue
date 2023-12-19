import { DeviceStateStore, MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types'
import { combineLatest, Observable } from 'rxjs'
import { MediaPicker } from '../pickers'
import { Colors } from '../constants'
import { filterEntitiesChanged } from '../utils/operators'
import { CompanionFeedbackButtonStyleResult, CompanionFeedbackDefinition } from '@companion-module/base'

@FeedbackId('media_state')
export class MediaStateFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedbackDefinition {
		return {
			name: 'Media State',
			type: 'boolean',
			description: '',
			defaultStyle: {
				color: Colors.BLACK,
				bgcolor: Colors.RED,
			},
			options: [
				MediaPicker(this.player),
				{
					id: 'mode',
					label: 'State',
					type: 'dropdown',
					default: MediaStateMode.Next,
					choices: [
						{ id: MediaStateMode.Current, label: 'Current' },
						{ id: MediaStateMode.Next, label: 'Next' },
					],
				},
			],
			callback: (event) => {
				const mediaId = event.options.mediaId as string
				const mode = event.options.mode as MediaStateMode
				const queueItem = this.player.state.get(DeviceStateStore, mode)

				if (!queueItem) {
					return false
				}

				return queueItem.mediaId === mediaId
			},
		}
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(MediaFileStore).pipe(filterEntitiesChanged())
	}

	selectCheckFeedback(): Observable<any> {
		return combineLatest([
			this.player.state.select(DeviceStateStore, 'currentMedia'),
			this.player.state.select(DeviceStateStore, 'nextMedia'),
		])
	}

	static build(mediaId: string, mode: MediaStateMode, style?: CompanionFeedbackButtonStyleResult): FeedbackPreset {
		return {
			feedbackId: getFeedbackId(this),
			options: {
				mediaId,
				mode,
			},
			style,
		}
	}
}

export enum MediaStateMode {
	Current = 'currentMedia',
	Next = 'nextMedia',
}
