import { Player, IoStateStore, VideoResolution } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'
import { Variable, VariableId } from './_variable.type'
import { distinctUntilChanged, map } from 'rxjs/operators'

@VariableId('sdi_sync')
export class SdiSyncVariable implements Variable {
	constructor(private readonly player: Player) {}

	get(): string {
		return 'SDI Sync'
	}

	selectUpdate(): Observable<string> {
		return this.player.state.select(IoStateStore).pipe(
			map((state) => this.getLabel(state.genLock)),
			distinctUntilChanged()
		)
	}

	private getLabel(state: VideoResolution | null): string {
		return state ? `${state.frameRate} Hz` : `Freerun`
	}
}
