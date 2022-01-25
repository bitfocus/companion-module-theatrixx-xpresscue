import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types';
import { Action, ActionId } from './action.types';
import { Player, SettingsStore } from '@theatrixx/player-connection';
import { TestPatternPicker } from '../pickers';
import { Observable } from 'rxjs';

@ActionId('set_test_pattern')
export class SetTestPatternAction implements Action {

  constructor(
    private readonly player: Player) {}
    
  get(): CompanionAction {
    return {
      label: 'Set Test Pattern',
      options: [
        TestPatternPicker(this.player)
      ]
    }
  }

  selectRefresh(): Observable<void> {
    return this.player.store.select('TestPattern');
  }

  async handle(event: CompanionActionEvent): Promise<void> {
    const store = this.player.store.getStore(SettingsStore);
    const testPattern = event.options.patternId as string;
    store.updatePartial({ testPattern });
  }
}

