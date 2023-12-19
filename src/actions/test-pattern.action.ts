import { Action, ActionId } from './_action.types.js'
import { Player, TestPatternStore } from '@theatrixx/xpresscue-connect'
import { TestPatternPicker } from '../pickers.js'
import { Observable } from 'rxjs'
import { CompanionActionDefinition } from '@companion-module/base'

@ActionId('set_test_pattern')
export class SetTestPatternAction implements Action {
	constructor(private readonly player: Player) {}

	get(): CompanionActionDefinition {
		return {
			name: 'Set Test Pattern',
			options: [TestPatternPicker(this.player)],
			callback: async (event) => {
				const testPattern = event.options.patternId as string
				await this.player.updateSettings('testPattern', testPattern)
			},
		}
	}

	selectRefresh(): Observable<any> {
		return this.player.state.select(TestPatternStore)
	}
}
