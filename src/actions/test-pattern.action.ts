import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { Action, ActionId } from './_action.types'
import { Player } from '@theatrixx/xpresscue-connect'
import { TestPatternPicker } from '../pickers'
import { Observable } from 'rxjs'

@ActionId('set_test_pattern')
export class SetTestPatternAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionAction {
		return {
			label: 'Set Test Pattern',
			options: [TestPatternPicker(this.player)],
		}
	}

	selectRefresh(): Observable<void> {
		return this.player.state.select('TestPattern')
	}

	handle(event: CompanionActionEvent): void {
		const testPattern = event.options.patternId as string
		this.player.updateSettings('testPattern', testPattern)
	}
}
