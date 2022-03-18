import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { PlaylistPicker } from '../pickers'
import { Action, ActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'

@ActionId('queue_skip')
export class QueueSkipAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Skip Queue',
			options: [
				{
					id: 'mode',
					label: 'Mode',
					type: 'dropdown',
					default: 'next',
					choices: [
						{ id: QueueSkipMode.Up, label: 'Up (Previous)' },
						{ id: QueueSkipMode.Down, label: 'Down (Next)' },
					],
				},
			],
		}
	}

	handle(event: CompanionActionEvent): void {
		const opts = event.options
		const mode = opts.mode as QueueSkipMode
		this.player.queueSkip(mode === QueueSkipMode.Up ? -1 : 1)
	}
}

enum QueueSkipMode {
	Up = 'up',
	Down = 'down',
}
