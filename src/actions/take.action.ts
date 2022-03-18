import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { Action, ActionId, ActionPreset, getActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('take')
export class TakeAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Take',
			options: [
				{
					id: 'without_play',
					label: 'Without Play',
					type: 'checkbox',
					default: false,
				},
			],
		}
	}

	handle(event: CompanionActionEvent): void {
		this.player.take(event.options.without_play as boolean)
	}

	static build(without_play = false): ActionPreset {
		return {
			action: getActionId(this),
			options: {
				without_play,
			},
		}
	}
}
