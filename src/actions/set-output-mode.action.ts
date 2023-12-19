import { Action, ActionId } from './_action.types'
import { Player, Settings } from '@theatrixx/xpresscue-connect'
import { VideoOutputModePicker } from '../pickers'
import { CompanionActionDefinition } from '@companion-module/base'

@ActionId('set_output_mode')
export class SetOutputModeAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Set Output Mode',
			options: [VideoOutputModePicker()],
			callback: async (event) => {
				await this.player.updateSettings(
					'videoOutputMode',
					event.options.videoOutputMode as Settings['videoOutputMode']
				)
			},
		}
	}
}
