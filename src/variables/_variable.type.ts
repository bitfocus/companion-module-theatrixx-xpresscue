import { createClassKeyDecorator } from '../utils/decorators.js'
import { ManagedInstance } from '../utils/manager.class.js'
import { Observable } from 'rxjs'

export const VARIABLE_IDKEY = 'variableId'

export const VariableId = createClassKeyDecorator(VARIABLE_IDKEY)

export interface Variable extends ManagedInstance<string> {
	/**
	 * Should return an Observable that will emit whenever the variable
	 * needs to be `updated` (indicating a state change)
	 * */
	selectUpdate(): Observable<string>
}
