import { Player, Type } from '@theatrixx/xpresscue-connect'
import { CompanionVariableDefinition } from '@companion-module/base'
import { Manager } from '../utils/manager.class.js'

import { merge, Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators/index.js'
import { Variable, VARIABLE_IDKEY } from './_variable.type.js'
import { TimeRemainingVariable } from './time-remaining.variable.js'
import { DeviceNameVariable } from './device-name.variable.js'
import { TimeElapsedVariable } from './time-elapsed.variable.js'
import { SdiSyncVariable } from './sdi-sync.variable.js'
import { DeviceOwnerVariable } from './device-owner.variable.js'

const ALL_VARIABLES: Type<Variable>[] = [
	TimeRemainingVariable,
	TimeElapsedVariable,
	DeviceNameVariable,
	DeviceOwnerVariable,
	SdiSyncVariable,
]

export class VariableManager extends Manager<string, Variable> {
	protected _update$ = new Subject<[string, string]>()

	constructor(protected readonly player: Player) {
		super(player, VARIABLE_IDKEY)
		this.initialize(ALL_VARIABLES)
	}

	getFlat(): CompanionVariableDefinition[] {
		return Object.entries(this.get()).reduce((total, [variableId, name]) => {
			return [...total, { name, variableId }]
		}, [] as CompanionVariableDefinition[])
	}

	get update$(): Observable<[string, string]> {
		return this._update$.asObservable()
	}

	protected initialize(types: Type<Variable>[]): void {
		super.initialize(types)
		const updateObs: Observable<[string, string]>[] = []
		for (const [idKey, instance] of this.instances) {
			if (instance.selectUpdate) {
				const obs = instance.selectUpdate().pipe(map((value) => [idKey, value] as [string, string]))
				updateObs.push(obs)
			}
		}

		/** Create a combined update request */
		merge(...updateObs).subscribe((ids) => this._update$.next(ids))
	}
}
