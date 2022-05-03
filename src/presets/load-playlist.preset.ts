import { Player, Playlist, PlaylistStore } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { CompanionBankPreset } from '../../../../instance_skel_types'
import { Colors } from '../constants'
import { Preset, PresetCategory, PresetWithoutCategory } from './_preset.types'
import { PlaylistNameFeedback } from '../feedbacks/playlist-name.feedback'
import { LoadPlaylistAction } from '../actions/load-playlist.action'

@PresetCategory('Load Playlist')
export class LoadPlaylistPreset implements Preset {
	constructor(private readonly player: Player) {}

	get(): PresetWithoutCategory[] {
		const items = this.player.state.get(PlaylistStore)
		return items.map((p) => LoadPlaylistPreset.createFromPlaylist(p))
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(PlaylistStore)
	}

	private static createFromPlaylist(item: Playlist): PresetWithoutCategory {
		return {
			label: item._id,
			bank: this.createBank(item),
			actions: [LoadPlaylistAction.build(item._id)],
			feedbacks: [PlaylistNameFeedback.build(item._id)],
		}
	}

	private static createBank(item: Playlist): CompanionBankPreset {
		return {
			style: 'text',
			text: item.name,
			size: 'auto',
			color: Colors.WHITE,
			bgcolor: Colors.BLACK,
		}
	}
}
