import { Player, DeviceInfoStore } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { Variable, VariableId } from './_variable.type'
import { distinctUntilChanged, map } from 'rxjs/operators'

@VariableId('device_owner')
export class DeviceOwnerVariable implements Variable {
	constructor(private readonly player: Player) {}

	get(): string {
		return 'Device Owner'
	}

	selectUpdate(): Observable<string> {
		return this.player.state.select(DeviceInfoStore).pipe(
			map((state) => state.owner),
			distinctUntilChanged()
		)
	}
}
