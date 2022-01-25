import { Player, Type } from '@theatrixx/player-connection';
import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types';
import { Action, ACTION_IDKEY } from './action.types';

import { LoadPlaylistAction } from './load-playlist.action';
import { PlayStateAction } from './play-state.action';
import { SetNextMediaAction } from './set-next-media.action';
import { TakeAction } from './take.action';
import { SetTestPatternAction } from './test-pattern.action';
import { Manager } from '../utils/manager.class';

const ALL_ACTIONS: Type<Action>[] = [
  PlayStateAction,
  TakeAction,
  SetNextMediaAction,
  LoadPlaylistAction,
  SetTestPatternAction
];


export class ActionManager extends Manager<CompanionAction, Action> {

  constructor(
    protected readonly player: Player) {
      super(player, ACTION_IDKEY);
      this.initialize(ALL_ACTIONS);
  }

  handle(event: CompanionActionEvent): void {
    if (this.instances.has(event.action)) {
      const instance = this.instances.get(event.action) as Action;
      instance.handle(event);
    }
  }

}
