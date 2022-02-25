import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { Action, ActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'

@ActionId('play_state')
export class PlayStateAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Set Play State',
			options: [
				{
					id: 'state',
					label: 'State',
					type: 'dropdown',
					default: 'togglePlayPause',
					choices: [
						{ id: PlayStateCommand.TogglePlayPause, label: 'Toggle Play/Pause' },
						{ id: PlayStateCommand.Play, label: 'Play' },
						{ id: PlayStateCommand.Pause, label: 'Pause' },
						{ id: PlayStateCommand.Stop, label: 'Stop' },
					],
				},
			],
		}
	}

	handle(event: CompanionActionEvent): void {
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
	}
}

enum PlayStateCommand {
	TogglePlayPause = 'togglePlayPause',
	Play = 'play',
	Pause = 'pause',
	Stop = 'stop',
}
