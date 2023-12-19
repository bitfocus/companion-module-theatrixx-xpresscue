import { MediaFile, MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { MediaNameFeedback } from '../feedbacks/media-name.feedback'
import { SetNextMediaAction } from '../actions/set-next-media.action'
import { Colors } from '../constants'
import { Preset, PresetCategory, PresetWithoutCategory } from './_preset.types'
import { MediaStateFeedback, MediaStateMode } from '../feedbacks/media-state.feedback'
import { MediaThumbnailFeedback } from '../feedbacks/media-thumbnail.feedback'
import { filterEntitiesChanged } from '../utils/operators'
import { cacheUpdated$, get } from '../utils/png-cache'
import { CompanionButtonStyleProps } from '@companion-module/base'

abstract class SetNextMediaPreset implements Preset {
	constructor(protected readonly player: Player, private withThumbails = false) {}

	get(): Record<string, PresetWithoutCategory> {
		const items = this.player.state.get(MediaFileStore)
		return Object.fromEntries(items.map((m) => [`set_next_media_${m._id}`, this.createFromMedia(m)]))
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(MediaFileStore).pipe(filterEntitiesChanged())
	}

	private createFromMedia(item: MediaFile): PresetWithoutCategory {
		const feedbacks = [
			MediaStateFeedback.build(item._id, MediaStateMode.Current, { bgcolor: Colors.RED, color: Colors.WHITE }),
			MediaStateFeedback.build(item._id, MediaStateMode.Next, { bgcolor: Colors.GREEN, color: Colors.BLACK }),
		]

		if (this.withThumbails) {
			feedbacks.push(MediaThumbnailFeedback.build(item._id))
		}
		if (!this.withThumbails) {
			feedbacks.push(MediaNameFeedback.build(item._id))
		}

		return {
			name: item._id,
			type: 'button',
			style: this.createBank(item),
			steps: [
				{
					down: [SetNextMediaAction.build(item._id)],
					up: [],
				},
			],
			feedbacks,
		}
	}

	protected abstract createBank(item: MediaFile): CompanionButtonStyleProps
}

@PresetCategory('Set Next Media (Text)')
export class SetNextMediaTextPreset extends SetNextMediaPreset {
	constructor(player: Player) {
		super(player, false)
	}

	protected createBank(item: MediaFile): CompanionButtonStyleProps {
		return {
			text: item.name,
			size: 'auto',
			color: Colors.WHITE,
			bgcolor: Colors.BLACK,
		}
	}
}

@PresetCategory('Set Next Media (Thumbnail)')
export class SetNextMediaThumbnailPreset extends SetNextMediaPreset {
	constructor(player: Player) {
		super(player, true)
	}

	selectRefresh(): Observable<any> {
		return cacheUpdated$
	}

	protected createBank(item: MediaFile): CompanionButtonStyleProps {
		return {
			text: '',
			png64: get(item._id),
			size: 'auto',
			color: Colors.WHITE,
			bgcolor: Colors.BLACK,
		}
	}
}
