import { CompanionActionDefinition } from '@companion-module/base'
import { Action, ActionId, ActionPreset, getActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('take')
export class TakeAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Take',
			options: [
				{
					id: 'without_play',
					label: 'Without Play',
					type: 'checkbox',
					default: false,
				},
			],
			callback: (event) => {
				this.player.take(event.options.without_play as boolean)
			},
		}
	}

	static build(without_play = false): ActionPreset {
		return {
			actionId: getActionId(this),
			options: {
				without_play,
			},
		}
	}
}
