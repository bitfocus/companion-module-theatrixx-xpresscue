import { Action, ActionId } from './_action.types.js'
import { Player, Settings } from '@theatrixx/xpresscue-connect'
import { PercentPicker } from '../pickers.js'
import { CompanionActionDefinition } from '@companion-module/base'

@ActionId('set_volume')
export class SetVolumeAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Set Master Volume',
			options: [PercentPicker()],
			callback: async (event) => {
				await this.player.updateSettings('masterVolume', event.options.value as Settings['masterVolume'])
			},
		}
	}
}
