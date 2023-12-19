import { CompanionActionDefinition } from '@companion-module/base'
import { TimePicker } from '../pickers'
import { Action, ActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('jump_playback')
export class JumpPlaybackAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Jump Playback',
			options: [
				TimePicker(),
				{
					id: 'mode',
					label: 'Jump From',
					type: 'dropdown',
					default: JumpPlaybackMode.Current,
					choices: [
						{ id: JumpPlaybackMode.Current, label: 'Current' },
						{ id: JumpPlaybackMode.End, label: 'End' },
						{ id: JumpPlaybackMode.Start, label: 'Start' },
					],
				},
			],
			callback: async (event) => {
				const opts = event.options
				const time = Number(opts.time) * 1000
				this.player.jump(time, opts.mode as JumpPlaybackMode)
			},
		}
	}
}

enum JumpPlaybackMode {
	Current = 'current',
	End = 'end',
	Start = 'start',
}
