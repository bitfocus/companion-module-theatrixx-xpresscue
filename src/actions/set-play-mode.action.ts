import { Action, ActionId } from './_action.types.js'
import { Player, Settings } from '@theatrixx/xpresscue-connect'
import { PlayModePicker } from '../pickers.js'
import { CompanionActionDefinition } from '@companion-module/base'

@ActionId('set_play_mode')
export class SetPlayModeAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Set Playback Mode',
			options: [PlayModePicker()],
			callback: async (event) => {
				await this.player.updateSettings('playMode', event.options.playMode as Settings['playMode'])
			},
		}
	}
}
