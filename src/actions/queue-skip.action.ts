import { CompanionActionDefinition } from '@companion-module/base'
import { Action, ActionId } from './_action.types.js'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('queue_skip')
export class QueueSkipAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Skip Queue',
			options: [
				{
					id: 'mode',
					label: 'Mode',
					type: 'dropdown',
					default: QueueSkipMode.Down,
					choices: [
						{ id: QueueSkipMode.Up, label: 'Up (Previous)' },
						{ id: QueueSkipMode.Down, label: 'Down (Next)' },
					],
				},
			],
			callback: (event) => {
				const opts = event.options
				const mode = opts.mode as QueueSkipMode
				this.player.queueSkip(mode === QueueSkipMode.Up ? -1 : 1)
			},
		}
	}
}

enum QueueSkipMode {
	Up = 'up',
	Down = 'down',
}
