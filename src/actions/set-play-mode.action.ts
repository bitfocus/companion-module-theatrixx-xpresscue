import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { Action, ActionId } from './_action.types'
import { Player, Settings } from '@theatrixx/xpresscue-connect'
import { PlayModePicker } from '../pickers'

@ActionId('set_play_mode')
export class SetPlayModeAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Set Playback Mode',
			options: [PlayModePicker()],
		}
	}

	handle(event: CompanionActionEvent): void {
		this.player.updateSettings('playMode', event.options.playMode as Settings['playMode'])
	}
}
