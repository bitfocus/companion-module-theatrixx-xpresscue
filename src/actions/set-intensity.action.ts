import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { Action, ActionId } from './_action.types'
import { Player, Settings } from '@theatrixx/xpresscue-connect'
import { PercentPicker } from '../pickers'

@ActionId('set_intensity')
export class SetIntensityAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Set Master Intensity',
			options: [PercentPicker()],
		}
	}

	handle(event: CompanionActionEvent): void {
		this.player.updateSettings('masterIntensity', event.options.value as Settings['masterIntensity'])
	}
}
