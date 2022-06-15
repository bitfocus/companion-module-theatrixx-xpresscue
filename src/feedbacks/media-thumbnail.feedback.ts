import { MediaFile, MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { CompanionFeedback } from '../../../../instance_skel_types'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types'
import { Observable, Subject } from 'rxjs'
import { MediaPicker } from '../pickers'
import { distinctArrayElements, filterEntitiesChanged } from '../utils/operators'
import Jimp from 'jimp/es'
import { map, tap } from 'rxjs/operators'
import { isArray } from 'lodash'

@FeedbackId('media_thumbnail')
export class MediaThumbnailFeedback implements Feedback {
	private cache = new Map<string, string>()
	private cacheUpdated$ = new Subject<void>()

	constructor(private readonly player: Player) {
		this.trackThumbnailChanges().subscribe()
	}

	get(): CompanionFeedback {
		return {
			label: 'Media Thumbnail',
			type: 'advanced',
			description: '',
			options: [MediaPicker(this.player)],
			callback: (event): any => {
				const medias = this.player.state.get(MediaFileStore)
				const media = medias.find((m) => m._id === event.options.mediaId)
				if (!media) {
					return false
				}
				const png64 = this.cache.get(media._id)
				if (!png64) {
					return false
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
		return this.cacheUpdated$.asObservable()
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(MediaFileStore).pipe(filterEntitiesChanged())
	}

	private updateChache(ids: string | string[], force = false): void {
		ids = isArray(ids) ? ids : [ids]
		for (const id of ids) {
			const cached = this.cache.get(id)
			if (cached && force === false) {
				return
			}
			this.loadThumbnail(id)
		}
	}

	private async loadThumbnail(id: string): Promise<void> {
		const api = this.player.client.api
		const url = `${api}media/${id}/thumbnail`
		try {
			const image = await Jimp.read(url)
			const resized = image.contain(72, 58)
			const base64 = await resized.getBase64Async(Jimp.MIME_PNG)
			const base64Str = base64.split(',')[1]
			this.cache.set(id, base64Str)
			this.cacheUpdated$.next()
		} catch (e) {
			console.error(`Thumbnail creation failed for media ${id} at URL ${url}`, e)
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

	static build(mediaId: string): FeedbackPreset {
		return {
			type: getFeedbackId(this),
			options: {
				mediaId,
			},
		}
	}
}
