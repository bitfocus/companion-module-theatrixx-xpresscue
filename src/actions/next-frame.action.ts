import { CompanionAction } from '../../../../instance_skel_types'
import { Action, ActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('next_frame')
export class NextFrameAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Next Frame',
			options: [],
		}
	}

	handle(): void {
		this.player.nextFrame()
	}
}
