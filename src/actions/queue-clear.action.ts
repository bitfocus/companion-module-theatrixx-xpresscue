import { CompanionAction } from '../../../../instance_skel_types'
import { Action, ActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('queue_clear')
export class QueueClearAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Clear Queue',
			options: [],
		}
	}

	handle(): void {
		this.player.queueClear()
	}
}
