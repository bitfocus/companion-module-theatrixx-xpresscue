import { CompanionActionDefinition } from '@companion-module/base'
import { Action, ActionId, ActionPreset, getActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('play_state')
export class PlayStateAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Set Play State',
			options: [
				{
					id: 'state',
					label: 'State',
					type: 'dropdown',
					default: PlayStateCommand.TogglePlayPause,
					choices: [
						{ id: PlayStateCommand.TogglePlayPause, label: 'Toggle Play/Pause' },
						{ id: PlayStateCommand.Play, label: 'Play' },
						{ id: PlayStateCommand.Pause, label: 'Pause' },
						{ id: PlayStateCommand.Stop, label: 'Stop' },
					],
				},
			],
			callback: (event) => {
				const player = this.player
				switch (event.options.state as PlayStateCommand) {
					case PlayStateCommand.TogglePlayPause:
						player.togglePlayPause()
						break
					case PlayStateCommand.Play:
						player.play()
						break
					case PlayStateCommand.Pause:
						player.pause()
						break
					case PlayStateCommand.Stop:
						player.stop()
						break
					default:
						break
				}
			},
		}
	}

	static build(state: PlayStateCommand): ActionPreset {
		return {
			actionId: getActionId(this),
			options: {
				state,
			},
		}
	}
}

export enum PlayStateCommand {
	TogglePlayPause = 'togglePlayPause',
	Play = 'play',
	Pause = 'pause',
	Stop = 'stop',
}
