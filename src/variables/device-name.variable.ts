import { Player, DeviceInfoStore } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { Variable, VariableId } from './_variable.type'
import { distinctUntilChanged, map } from 'rxjs/operators'

@VariableId('device_name')
export class DeviceNameVariable implements Variable {
	constructor(private readonly player: Player) {}

	get(): string {
		return 'Device Name'
	}

	selectUpdate(): Observable<string> {
		return this.player.state.select(DeviceInfoStore).pipe(
			map((state) => state.name),
			distinctUntilChanged()
		)
	}
}
