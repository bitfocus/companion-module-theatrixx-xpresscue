import { Player, Playlist, PlaylistStore } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { Colors } from '../constants'
import { Preset, PresetCategory, PresetWithoutCategory } from './_preset.types'
import { PlaylistNameFeedback } from '../feedbacks/playlist-name.feedback'
import { LoadPlaylistAction } from '../actions/load-playlist.action'
import { filterEntitiesChanged } from '../utils/operators'
import { CompanionButtonStyleProps } from '@companion-module/base'

@PresetCategory('Load Playlist')
export class LoadPlaylistPreset implements Preset {
	constructor(private readonly player: Player) {}

	get(): Record<string, PresetWithoutCategory> {
		const items = this.player.state.get(PlaylistStore)
		return Object.fromEntries(items.map((p) => [`load_playlist_${p._id}`, LoadPlaylistPreset.createFromPlaylist(p)]))
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(PlaylistStore).pipe(filterEntitiesChanged())
	}

	private static createFromPlaylist(item: Playlist): PresetWithoutCategory {
		return {
			name: item._id,
			type: 'button',
			style: this.createBank(item),
			steps: [
				{
					down: [LoadPlaylistAction.build(item._id)],
					up: [],
				},
			],
			feedbacks: [PlaylistNameFeedback.build(item._id)],
		}
	}

	private static createBank(item: Playlist): CompanionButtonStyleProps {
		return {
			text: item.name,
			size: 'auto',
			color: Colors.WHITE,
			bgcolor: Colors.BLACK,
		}
	}
}
