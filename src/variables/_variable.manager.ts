import { Player, Type } from '@theatrixx/xpresscue-connect'
import { CompanionVariable } from '../../../../instance_skel_types'
import { Manager } from '../utils/manager.class'

import { merge, Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Variable, VARIABLE_IDKEY } from './_variable.type'
import { TimeRemainingVariable } from './time-remaining.variable'
import { DeviceNameVariable } from './device-name.variable'
import { TimeElapsedVariable } from './time-elapsed.variable'
import { SdiSyncVariable } from './sdi-sync.variable'
import { DeviceOwnerVariable } from './device-owner.variable'

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

	getFlat(): CompanionVariable[] {
		return Object.entries(this.get()).reduce((total, [name, label]) => {
			return [...total, { name, label }]
		}, [] as CompanionVariable[])
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
