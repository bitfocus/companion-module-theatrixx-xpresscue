import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types';
import { Action, ActionId } from './_action.types';
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
    const player = this.player;
    switch (event.options.state) {
      case 'togglePlayPause':
        player.togglePlayPause();
        break;
      case 'play':
        player.play();
        break;
      case 'pause':
        player.pause();
        break;
      case 'stop':
        player.stop();
        break;
      default:
        break;
    }
  }
}
