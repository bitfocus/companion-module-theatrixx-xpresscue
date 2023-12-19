import { Action, ActionId } from './_action.types'
import { Player, Settings } from '@theatrixx/xpresscue-connect'
import { PercentPicker } from '../pickers'
import { CompanionActionDefinition } from '@companion-module/base'

@ActionId('set_intensity')
export class SetIntensityAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Set Master Intensity',
			options: [PercentPicker()],
			callback: async (event) => {
				await this.player.updateSettings('masterIntensity', event.options.value as Settings['masterIntensity'])
			},
		}
	}
}
