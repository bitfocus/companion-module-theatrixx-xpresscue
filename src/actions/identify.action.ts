import { CompanionAction } from '../../../../instance_skel_types'
import { Action, ActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('identify')
export class IdentifyAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Identify',
			options: [],
		}
	}

	handle(): void {
		this.player.identify();
	}
}
