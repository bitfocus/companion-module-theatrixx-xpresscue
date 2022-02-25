import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { Action, ActionId } from './_action.types'
import { Player, Settings } from '@theatrixx/xpresscue-connect'
import { VideoOutputModePicker } from '../pickers'

@ActionId('set_output_mode')
export class SetOutputModeAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Set Output Mode',
			options: [VideoOutputModePicker()],
		}
	}

	handle(event: CompanionActionEvent): void {
		this.player.updateSettings('videoOutputMode', event.options.videoOutputMode as Settings['videoOutputMode'])
	}
}
