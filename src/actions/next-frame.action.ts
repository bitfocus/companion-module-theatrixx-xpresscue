import { CompanionActionDefinition } from '@companion-module/base'
import { Action, ActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('next_frame')
export class NextFrameAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Next Frame',
			options: [],
			callback: () => {
				this.player.nextFrame()
			},
		}
	}
}
