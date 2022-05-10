import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { MediaPicker } from '../pickers'
import { Action, ActionId, ActionPreset, getActionId } from './_action.types'
import { MediaFileStore, Player } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { filterEntitiesChanged } from '../utils/operators'

@ActionId('set_next_media')
export class SetNextMediaAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Set Next Media',
			options: [MediaPicker(this.player)],
		}
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(MediaFileStore).pipe(filterEntitiesChanged())
	}

	handle(event: CompanionActionEvent): void {
		this.player.setNextMedia(event.options.mediaId as string)
	}

	static build(mediaId: string): ActionPreset {
		return {
			action: getActionId(this),
			options: {
				mediaId,
			},
		}
	}
}
