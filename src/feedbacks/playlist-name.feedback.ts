import { Player, PlaylistStore } from '@theatrixx/xpresscue-connect'
import { CompanionFeedback } from '../../../../instance_skel_types'
import { Feedback, FeedbackId, FeedbackPreset, getFeedbackId } from './_feedback.types'
import { Observable } from 'rxjs'
import { PlaylistPicker } from '../pickers'

@FeedbackId('playlist_name')
export class PlaylistNameFeedback implements Feedback {
	constructor(private readonly player: Player) {}

	get(): CompanionFeedback {
		return {
			label: 'Playlist Name',
			type: 'advanced',
			description: '',
			options: [PlaylistPicker(this.player)],
			callback: (event): any => {
				const playlists = this.player.state.get(PlaylistStore)
				const playlist = playlists.find((p) => p._id === event.options.playlistId)
				if (!playlist) {
					return false
				}
				return {
					text: playlist.name,
				}
			},
		}
	}

	selectCheckFeedback(): Observable<any> {
		return this.player.state.select(PlaylistStore)
	}

	static build(playlistId: string): FeedbackPreset {
		return {
			type: getFeedbackId(this),
			options: {
				playlistId,
			},
		}
	}
}
