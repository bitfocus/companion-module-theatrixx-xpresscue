import { CompanionAction, CompanionActionEvent, CompanionPreset } from '../../../../instance_skel_types';
import { MediaPicker } from '../pickers';
import { Action, ActionId, getActionId } from './_action.types';
import { Player } from '@theatrixx/player-connection';
import { Observable } from 'rxjs';

@ActionId('set_next_media')
export class SetNextMediaAction implements Action {

  constructor(
    private readonly player: Player) {}
    
  get(): CompanionAction {
    return {
      label: 'Set Next Media',
      options: [
        MediaPicker(this.player),
      ]
    }
  }

  selectRefresh(): Observable<void> {
    return this.player.state.select('MediaFile');
  }

  handle(event: CompanionActionEvent): void {
    this.player.setNextMedia(event.options.mediaId as string);
  }

  static build(mediaId: string) {
    return {
      action: getActionId(this),
      options: {
        mediaId
      }
    }
  }
}
