import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { Action, ActionId } from './_action.types'
import { Player, Settings } from '@theatrixx/xpresscue-connect'
import { PercentPicker } from '../pickers'

@ActionId('set_volume')
export class SetVolumeAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Set Master Volume',
			options: [PercentPicker()],
		}
	}

	handle(event: CompanionActionEvent): void {
		this.player.updateSettings('masterVolume', event.options.value as Settings['masterVolume'])
	}
}
