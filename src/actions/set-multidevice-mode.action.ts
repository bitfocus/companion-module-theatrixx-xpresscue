import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { Action, ActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'
import { MultiDeviceModePicker } from '../pickers'

@ActionId('set_multi_device_mode')
export class SetMultiDeviceModeAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Set Multi-Device Mode',
			options: [MultiDeviceModePicker()],
		}
	}

	handle(event: CompanionActionEvent): void {
		const isFollower = event.options.multiDeviceMode === 'follower'
		this.player.updateSettings('isFollower', isFollower)
	}
}
