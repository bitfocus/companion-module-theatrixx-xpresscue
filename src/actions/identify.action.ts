import { CompanionActionDefinition } from '@companion-module/base'
import { Action, ActionId } from './_action.types.js'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('identify')
export class IdentifyAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Identify',
			options: [],
			callback: async () => {
				await this.player.identify()
			},
		}
	}
}
