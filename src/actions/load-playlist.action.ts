import { PlaylistPicker } from '../pickers'
import { Action, ActionId, ActionPreset, getActionId } from './_action.types'
import { Player, PlaylistStore } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { filterEntitiesChanged } from '../utils/operators'
import { CompanionActionDefinition } from '@companion-module/base'

@ActionId('load_playlist')
export class LoadPlaylistAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Load Playlist',
			options: [
				PlaylistPicker(this.player),
				{
					id: 'mode',
					label: 'Function',
					type: 'dropdown',
					default: LoadPlaylistMode.Replace,
					choices: [
						{ id: LoadPlaylistMode.Append, label: 'Append' },
						{ id: LoadPlaylistMode.Replace, label: 'Replace' },
					],
				},
			],
			callback: async (event) => {
				const opts = event.options
				await this.player.loadPlaylist(opts.playlistId as string, opts.mode as LoadPlaylistMode)
			},
		}
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(PlaylistStore).pipe(filterEntitiesChanged())
	}

	static build(playlistId: string, mode?: LoadPlaylistMode): ActionPreset {
		return {
			actionId: getActionId(this),
			options: {
				playlistId,
				mode,
			},
		}
	}
}

export enum LoadPlaylistMode {
	Append = 'append',
	Replace = 'replace',
}
