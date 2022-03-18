import { DeviceStateStore, MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { CompanionFeedback, CompanionFeedbackBoolean, CompanionFeedbackEvent } from '../../../../instance_skel_types'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types'
import { combineLatest, Observable } from 'rxjs'
import { MediaPicker } from '../pickers'
import { Colors } from '../constants'

@FeedbackId('media_state')
export class MediaStateFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedback {
		return {
			label: 'Media State',
			type: 'boolean',
			description: '',
			style: {
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
			callback: (event: CompanionFeedbackEvent) => {
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
		return combineLatest([
			this.player.state.select(MediaFileStore),
			this.player.state.select(DeviceStateStore, 'currentMedia'),
			this.player.state.select(DeviceStateStore, 'nextMedia'),
		])
	}

	static build(mediaId: string, mode: MediaStateMode, style?: CompanionFeedbackBoolean['style']): FeedbackPreset {
		return {
			type: getFeedbackId(this),
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
