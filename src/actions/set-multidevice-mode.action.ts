import { Action, ActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'
import { MultiDeviceModePicker } from '../pickers'
import { CompanionActionDefinition } from '@companion-module/base'

@ActionId('set_multi_device_mode')
export class SetMultiDeviceModeAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Set Multi-Device Mode',
			options: [MultiDeviceModePicker()],
			callback: async (event) => {
				const isFollower = event.options.multiDeviceMode === 'follower'
				await this.player.updateSettings('isFollower', isFollower)
			},
		}
	}
}
