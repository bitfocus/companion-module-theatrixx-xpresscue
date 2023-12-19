import { MediaFile, MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types'
import { Observable } from 'rxjs'
import { MediaPicker } from '../pickers'
import { distinctArrayElements, filterEntitiesChanged } from '../utils/operators'
import { map, tap } from 'rxjs/operators'
import { isArray } from 'lodash-es'
import { updateChache, get, cacheUpdated$ } from '../utils/png-cache'
import { CompanionFeedbackDefinition } from '@companion-module/base'

@FeedbackId('media_thumbnail')
export class MediaThumbnailFeedback implements Feedback {
	constructor(private readonly player: Player) {
		this.trackThumbnailChanges().subscribe()
	}

	get(): CompanionFeedbackDefinition {
		return {
			name: 'Media Thumbnail',
			type: 'advanced',
			description: '',
			options: [MediaPicker(this.player)],
			callback: (event) => {
				const medias = this.player.state.get(MediaFileStore)
				const media = medias.find((m) => m._id === event.options.mediaId)
				if (!media) {
					return {}
				}
				const png64 = get(media._id)
				if (!png64) {
					return {}
				}
				return {
					png64,
				}
			},
			subscribe: (event) => {
				const mediaId = event.options.mediaId as string
				this.updateChache(mediaId)
			},
		}
	}

	selectCheckFeedback(): Observable<any> {
		return cacheUpdated$
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(MediaFileStore).pipe(filterEntitiesChanged())
	}

	private updateChache(ids: string | string[], force = false): void {
		ids = isArray(ids) ? ids : [ids]
		for (const id of ids) {
			const url = this.getThumbnailUrl(id)
			updateChache(id, url, force)
		}
	}

	private trackThumbnailChanges(): Observable<string[]> {
		return this.player.state.select(MediaFileStore).pipe(
			distinctArrayElements(this.filterStaleThumbnails as any),
			map((medias) => medias.map((m) => m._id)),
			tap((ids) => this.updateChache(ids, true))
		)
	}

	/** Filters out the thumbnails that have not changed */
	private filterStaleThumbnails(previousArray: MediaFile[], newArray: MediaFile[]): MediaFile[] {
		return newArray.filter(
			(el) => el.thumbnailPoint !== previousArray.find((pEl) => pEl._id === el._id)?.thumbnailPoint
		)
	}

	private getThumbnailUrl(id: string): string {
		const api = this.player.client.api
		return `${api}media/${id}/thumbnail`
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
