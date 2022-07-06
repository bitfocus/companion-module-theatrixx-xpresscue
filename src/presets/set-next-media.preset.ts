import { MediaFile, MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { MediaNameFeedback } from '../feedbacks/media-name.feedback'
import { CompanionBankPreset } from '../../../../instance_skel_types'
import { SetNextMediaAction } from '../actions/set-next-media.action'
import { Colors } from '../constants'
import { Preset, PresetCategory, PresetWithoutCategory } from './_preset.types'
import { MediaStateFeedback, MediaStateMode } from '../feedbacks/media-state.feedback'
import { MediaThumbnailFeedback } from '../feedbacks/media-thumbnail.feedback'
import { filterEntitiesChanged } from '../utils/operators'
import { cacheUpdated$, get } from '../utils/png-cache'

abstract class SetNextMediaPreset implements Preset {
	constructor(protected readonly player: Player, private withThumbails = false) {}

	get(): PresetWithoutCategory[] {
		const items = this.player.state.get(MediaFileStore)
		return items.map((m) => this.createFromMedia(m))
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
			label: item._id,
			bank: this.createBank(item),
			actions: [SetNextMediaAction.build(item._id)],
			feedbacks,
		}
	}

	protected abstract createBank(item: MediaFile): CompanionBankPreset
}

@PresetCategory('Set Next Media (Text)')
export class SetNextMediaTextPreset extends SetNextMediaPreset {
	constructor(player: Player) {
		super(player, false)
	}

	protected createBank(item: MediaFile): CompanionBankPreset {
		return {
			style: 'text',
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

	protected createBank(item: MediaFile): CompanionBankPreset {
		return {
			style: 'png',
			text: '',
			png64: get(item._id),
			size: 'auto',
			color: Colors.WHITE,
			bgcolor: Colors.BLACK,
		}
	}
}
