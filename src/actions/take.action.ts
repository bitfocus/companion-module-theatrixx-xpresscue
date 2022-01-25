import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types';
import { Action, ActionId } from './action.types';
import { Player } from '@theatrixx/player-connection';

@ActionId('take')
export class TakeAction implements Action {

  constructor(
    private readonly player: Player) {}
    
  get(): CompanionAction {
    return {
      label: 'Take',
      options: [
        {
          id: 'without_play',
          label: 'Without Play',
          type: 'checkbox',
          default: false
        }
      ]
    }
  }

  handle(event: CompanionActionEvent): void {
    this.player.take(event.options.without_play as boolean);
  }
}
