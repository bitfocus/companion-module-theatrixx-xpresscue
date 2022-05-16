import { Player, DeviceStateStore } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { Variable, VariableId } from './_variable.type'
import { distinctUntilChanged, map } from 'rxjs/operators'
import { readableMiliseconds } from '../utils/transform'

@VariableId('time_elapsed')
export class TimeElapsedVariable implements Variable {
	constructor(private readonly player: Player) {}

	get(): string {
		return 'Time Elapsed'
	}

	selectUpdate(): Observable<string> {
		return this.player.state.select(DeviceStateStore).pipe(
			map((state) => state.progress.elapsed),
			map((value) => readableMiliseconds(value)),
			distinctUntilChanged()
		)
	}
}
