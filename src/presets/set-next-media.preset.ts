import { MediaFile, MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { MediaNameFeedback } from '../feedbacks/media-name.feedback'
import { CompanionBankPreset } from '../../../../instance_skel_types'
import { SetNextMediaAction } from '../actions/set-next-media.action'
import { Colors } from '../constants'
import { Preset, PresetCategory, PresetWithoutCategory } from './_preset.types'
import { MediaStateFeedback, MediaStateMode } from '../feedbacks/media-state.feedback'

@PresetCategory('Set Next Media')
export class SetNextMediaPreset implements Preset {
	constructor(private readonly player: Player) {}

	get(): PresetWithoutCategory[] {
		const items = this.player.state.get(MediaFileStore)
		return items.map((m) => SetNextMediaPreset.createFromMedia(m))
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(MediaFileStore)
	}

	private static createFromMedia(item: MediaFile): PresetWithoutCategory {
		return {
			label: item._id,
			bank: this.createBank(item),
			actions: [SetNextMediaAction.build(item._id)],
			feedbacks: [
				MediaNameFeedback.build(item._id),
				MediaStateFeedback.build(item._id, MediaStateMode.Current, { bgcolor: Colors.RED, color: Colors.WHITE }),
				MediaStateFeedback.build(item._id, MediaStateMode.Next, { bgcolor: Colors.GREEN, color: Colors.BLACK }),
			],
		}
	}

	private static createBank(item: MediaFile): CompanionBankPreset {
		return {
			style: 'text',
			text: item.name,
			size: 'auto',
			color: Colors.WHITE,
			bgcolor: Colors.BLACK,
		}
	}
}
