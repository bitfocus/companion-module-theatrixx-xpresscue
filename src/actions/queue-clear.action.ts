import { CompanionActionDefinition } from '@companion-module/base'
import { Action, ActionId } from './_action.types.js'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('queue_clear')
export class QueueClearAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Clear Queue',
			options: [],
			callback: async () => {
				await this.player.queueClear()
			},
		}
	}
}
