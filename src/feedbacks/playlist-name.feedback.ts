import { Player, PlaylistStore } from '@theatrixx/xpresscue-connect'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types.js'
import { Observable } from 'rxjs'
import { PlaylistPicker } from '../pickers.js'
import { filterEntitiesChanged } from '../utils/operators.js'
import { CompanionFeedbackDefinition } from '@companion-module/base'

@FeedbackId('playlist_name')
export class PlaylistNameFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedbackDefinition {
		return {
			name: 'Playlist Name',
			type: 'advanced',
			description: '',
			options: [PlaylistPicker(this.player)],
			callback: (event) => {
				const playlists = this.player.state.get(PlaylistStore)
				const playlist = playlists.find((p) => p._id === event.options.playlistId)
				if (!playlist) {
					return {}
				}
				return {
					text: playlist.name,
				}
			},
		}
	}

	selectCheckFeedback(): Observable<any> {
		return this.player.state.select(PlaylistStore).pipe(filterEntitiesChanged())
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(PlaylistStore).pipe(filterEntitiesChanged())
	}

	static build(playlistId: string): FeedbackPreset {
		return {
			feedbackId: getFeedbackId(this),
			options: {
				playlistId,
			},
		}
	}
}
