import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { PlaylistPicker } from '../pickers'
import { Action, ActionId, ActionPreset, getActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'

@ActionId('load_playlist')
export class LoadPlaylistAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Load Playlist',
			options: [
				PlaylistPicker(this.player),
				{
					id: 'mode',
					label: 'Function',
					type: 'dropdown',
					default: 'replace',
					choices: [
						{ id: LoadPlaylistMode.Append, label: 'Append' },
						{ id: LoadPlaylistMode.Replace, label: 'Replace' },
					],
				},
			],
		}
	}

	selectRefresh(): Observable<void> {
		return this.player.state.select('Playlist')
	}

	handle(event: CompanionActionEvent): void {
		const opts = event.options
		this.player.loadPlaylist(opts.playlistId as string, opts.mode as LoadPlaylistMode)
	}

	static build(playlistId: string, mode?: LoadPlaylistMode): ActionPreset {
		return {
			action: getActionId(this),
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
