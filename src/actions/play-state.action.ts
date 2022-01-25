import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types';
import { Action, ActionId } from './action.types';
import { Player } from '@theatrixx/player-connection';

@ActionId('play_pause')
export class PlayStateAction implements Action {

  constructor(
    private readonly player: Player) {}
    
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
            { id: 'togglePlayPause', label: 'Toggle Play/Pause' },
            { id: 'play', label: 'Play' },
            { id: 'pause', label: 'Pause' },
            { id: 'stop', label: 'Stop' }
          ]
        }
      ]
    }
  }

  handle(event: CompanionActionEvent): void {
    this.player.client.emit(`playback:${event.options.state}`);
  }
}
