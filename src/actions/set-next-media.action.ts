import { MediaPicker } from '../pickers.js'
import { Action, ActionId, ActionPreset, getActionId } from './_action.types.js'
import { MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { filterEntitiesChanged } from '../utils/operators.js'
import { CompanionActionDefinition } from '@companion-module/base'

@ActionId('set_next_media')
export class SetNextMediaAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Set Next Media',
			options: [MediaPicker(this.player)],
			callback: (event) => {
				this.player.setNextMedia(event.options.mediaId as string)
			},
		}
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(MediaFileStore).pipe(filterEntitiesChanged())
	}

	static build(mediaId: string): ActionPreset {
		return {
			actionId: getActionId(this),
			options: {
				mediaId,
			},
		}
	}
}
